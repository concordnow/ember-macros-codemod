const { buildDeclare, buildGet } = require('./builder');

function transformComp(path, j) {
  let arrowFunc = path.node.value.arguments[path.node.value.arguments.length - 1];

  let body;

  if (arrowFunc.body.body) {
    body = arrowFunc.body.body;
  } else {
    body = [j.returnStatement(arrowFunc.body)];
  }

  let declarations = [];

  path.node.value.arguments.slice(0, -1).forEach((arg, index) => {
    if (arg.value.includes('.{')) {
      let prefix = arg.value.split('.{')[0];
      declarations = declarations.concat(
        arg.value.match(/\.\{(.*)\}/)[1].split(',').map(i => `${prefix}.${i}`)
      );
    } else {
      declarations.push(arg.value);
    }
  });

  path.node.value.arguments.splice(
    path.node.value.arguments.length - 1,
    1,
    j.functionDeclaration(
      j.identifier(''),
      [],
      j.blockStatement([
        ...declarations.map((arg, index) => {
          return buildDeclare(arrowFunc.params[index].name, arg, j);
        }),
        ...body,
      ])
    )
  );

  path.node.value.callee = j.identifier('computed');
}

function reduceArgs(ctor, operator, args, transformRec, j) {
  return args.reduce((acc, val, i, arr) => {
    let next = arr[i + 1];
    return next ? ctor(operator, acc, transformRec(next, j)) : acc;
  }, transformRec(args[0], j));
}

function transformRec(node, j) {
  let binaryOperator;

  if (node.type === 'StringLiteral') {
    return buildGet(node.value, j);
  }
  if ([
    'NullLiteral',
    'NumericLiteral',
    'BooleanLiteral',
    'UnaryExpression',
    'ArrowFunctionExpression',
    'ArrayExpression',
  ].includes(node.type)) {
    return node;
  }
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
    switch (node.callee.name) {
      case 'raw':
        return node.arguments[0];

      // Boolean
      case 'and':
        return reduceArgs(j.logicalExpression, '&&', node.arguments, transformRec, j);
      case 'bool':
        return j.unaryExpression('!', j.unaryExpression('!', transformRec(node.arguments[0], j)));
      case 'conditional':
        if (node.arguments.length === 2) {
          return j.conditionalExpression(...node.arguments.map((arg) => transformRec(arg, j)), j.identifier('undefined'));
        } else {
          return j.conditionalExpression(...node.arguments.map((arg) => transformRec(arg, j)));
        }
      case 'defaultTrue':
        throw new Error('Unsupported macro');
      case 'nand':
        return j.unaryExpression(
          '!',
          reduceArgs(j.logicalExpression, '&&', node.arguments, transformRec, j)
        );
      case 'nor':
        return j.unaryExpression(
          '!',
          reduceArgs(j.logicalExpression, '||', node.arguments, transformRec, j)
        );
      case 'not':
        return j.unaryExpression('!', transformRec(node.arguments[0], j));
      case 'or':
        return reduceArgs(j.logicalExpression, '||', node.arguments, transformRec, j);
      case 'unless':
        return j.conditionalExpression(
          ...node.arguments.map((arg, i) => {
            return i === 0 ? j.unaryExpression('!', transformRec(arg, j)) : transformRec(arg, j);
          })
        );
      case 'xnor':
      case 'xor':
        throw new Error('Unsupported macro');

      // Comparison
      case 'eq':
      case 'equal': {
        let [firstArg, ...args] = node.arguments;
        return reduceArgs(
          j.logicalExpression,
          '&&',
          args,
          (arg, j) => {
            return j.binaryExpression('===', transformRec(firstArg, j), transformRec(arg, j));
          },
          j
        );
      }
      case 'neq':
      case 'notEqual': {
        let [firstArg, ...args] = node.arguments;
        return reduceArgs(
          j.logicalExpression,
          '&&',
          args,
          (arg, j) => {
            return j.binaryExpression('!==', transformRec(firstArg, j), transformRec(arg, j));
          },
          j
        );
      }
      case 'gt':
      case 'gte':
      case 'lt':
      case 'lte':
        if (node.callee.name === 'lt') {
          binaryOperator = '<';
        }
        if (node.callee.name === 'lte') {
          binaryOperator = '<=';
        }
        if (node.callee.name === 'gt') {
          binaryOperator = '>';
        }
        if (node.callee.name === 'gte') {
          binaryOperator = '>=';
        }
        return j.binaryExpression(
          binaryOperator,
          transformRec(node.arguments[0], j),
          transformRec(node.arguments[1], j)
        );
      case 'instanceOf':
        throw new Error('Unsupported macro');

      // Number
      case 'add':
      case 'sum':
      case 'difference':
      case 'substract':
      case 'multiply':
      case 'product':
      case 'divide':
      case 'quotient':
        if (node.callee.name === 'add' || node.callee.name === 'sum') {
          binaryOperator = '+';
        }
        if (node.callee.name === 'difference' || node.callee.name === 'substract') {
          binaryOperator = '-';
        }
        if (node.callee.name === 'multiply' || node.callee.name === 'product') {
          binaryOperator = '*';
        }
        if (node.callee.name === 'divide' || node.callee.name === 'quotient') {
          binaryOperator = '/';
        }

        return reduceArgs(j.binaryExpression, binaryOperator, node.arguments, transformRec, j);
      case 'parseInt':
      case 'parseFloat':
        return j.callExpression(
          j.identifier(node.callee.name),
          node.arguments.map((arg) => transformRec(arg, j))
        );

      // Object
      case 'isEmpty':
        return j.callExpression(j.identifier('isEmpty'), [
          transformRec(node.arguments[0], j),
        ]);
      case 'getBy':
        return j.callExpression(j.identifier('get'), [
          transformRec(node.arguments[0], j),
          transformRec(node.arguments[1], j),
        ]);
      case 'notEmpty':
        return j.unaryExpression('!', j.callExpression(j.identifier('isEmpty'), [
            transformRec(node.arguments[0], j),
        ]));

      // Array
      case 'collect':
        return j.arrayExpression(node.arguments.map(arg => transformRec(arg, j)));
    }
  }

  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
    if (node.callee.object.name === 'array') {
      switch (node.callee.property.name) {
        case 'any':
        case 'compact':
        case 'concat':
        case 'every':
        case 'filterBy':
        case 'filter':
        case 'findBy':
        case 'find':
        case 'map':
        case 'mapBy':
        case 'rejectBy':
        case 'isAny':
        case 'isEvery':
        case 'includes':
        case 'indexOf':
        case 'join':
        case 'reduce':
        case 'uniq':
        case 'uniqBy':
        case 'sort':
        case 'slice':
        case 'without':
        case 'reverse':
        case 'objectAt': {
          let [firstArg, ...args] = node.arguments;
          return j.callExpression(
            j.memberExpression(
              transformRec(firstArg, j),
              j.identifier(node.callee.property.name),
              false
            ),
            args.map((arg) => transformRec(arg, j))
          );
        }
        case 'first':
          return j.memberExpression(transformRec(node.arguments[0], j), j.numericLiteral(0), true);
        case 'length':
          return j.memberExpression(
            transformRec(node.arguments[0], j),
            j.identifier('length'),
            false
          );
      }
    }
    if (node.callee.object.name === 'string') {
      switch (node.callee.property.name) {
        case 'camelize':
        case 'capitalize':
        case 'classify':
        case 'dasherize':
        case 'decamelize':
        case 'indexOf':
        case 'split':
        case 'substr':
        case 'substring':
          let [firstArg, ...args] = node.arguments;
          return j.callExpression(
            j.memberExpression(
              transformRec(firstArg, j),
              j.identifier(node.callee.property.name),
              false
            ),
            args.map((arg) => transformRec(arg, j))
          );

        case 'toUpper':
        case 'toLower':
          return j.callExpression(
            j.memberExpression(
              transformRec(node.arguments[0], j),
              j.identifier(`${node.callee.property.name}Case`),
              false
            ),
            []
          );
        case 'htmlSafe':
          return j.callExpression(j.identifier('htmlSafe'), [
            transformRec(node.arguments[0], j),
          ]);
        case 'length':
          return j.memberExpression(
            transformRec(node.arguments[0], j),
            j.identifier('length'),
            false
          );
      }
    }
  }

  if (node.type === 'TaggedTemplateExpression' && node.tag.name === 'tag') {
    return j.templateLiteral(node.quasi.quasis, node.quasi.expressions.map(arg => transformRec(arg, j)));
  }
}

function extractMacroArguments(macroNode, j) {
  let args = macroNode.arguments;

  if (macroNode.type === 'TaggedTemplateExpression' && macroNode.tag.name === 'tag') {
    args = macroNode.quasi.expressions;
  }

  let shouldAppendBrackets = (index) => {
    let isArrayMacro =
      macroNode.type === 'CallExpression' &&
      macroNode.callee.type === 'MemberExpression' &&
      macroNode.callee.object.name === 'array';
    if (isArrayMacro && index === 0) {
      return true;
    } else if (isArrayMacro && macroNode.callee.property.name === 'concat' && index === 1) {
      return true;
    } else {
      return false;
    }
  };
  let shouldAppendEach = (index) => {
    return (
      shouldAppendBrackets(index) &&
      macroNode.callee.property.name.slice(-2) === 'By' &&
      macroNode.arguments[1].type === 'CallExpression' &&
      macroNode.arguments[1].callee.name === 'raw'
    );
  };

  args = args
    .map((node, index) => {
      if (node.type === 'CallExpression' && node.callee.name !== 'raw') {
        return extractMacroArguments(node, j);
      }
      if (node.type === 'TaggedTemplateExpression' && node.tag.name === 'tag') {
        return extractMacroArguments(node, j);
      }
      if (node.type === 'StringLiteral') {
        if (shouldAppendEach(index)) {
          let rawValue = macroNode.arguments[1].arguments[0].value;
          return j.stringLiteral(`${node.value}.@each.${rawValue}`);
        }
        if (shouldAppendBrackets(index)) {
          return j.stringLiteral(`${node.value}.[]`);
        }
        return node;
      }
    })
    .flat(Infinity)
    .filter(function (el) {
      return el != null;
    });

  let argsValues = args.map(item => item.value);

  return args
    .filter((item, index) => argsValues.indexOf(item.value) === index);
}

function transformMacro(path, j) {
  // ember-macro-helpers
  if (
    path.node.value.type === 'CallExpression' &&
    path.node.value.callee.type === 'Identifier' &&
    path.node.value.callee.name === 'comp'
  ) {
    return transformComp(path, j);
  }

  // ember-awesome-macros
  let args = extractMacroArguments(path.node.value, j);

  args = [
    ...args,
    j.functionDeclaration(
      j.identifier(''),
      [],
      j.blockStatement([j.returnStatement(transformRec(path.node.value, j))])
    ),
  ];

  if (path.node.value.type === 'TaggedTemplateExpression' && path.node.value.tag.name === 'tag') {
    path.node.value = j.callExpression(j.identifier('computed'), []);
  }

  path.node.value.arguments = args;
  path.node.value.callee = j.identifier('computed');
}

module.exports = {
  transformMacro,
};
