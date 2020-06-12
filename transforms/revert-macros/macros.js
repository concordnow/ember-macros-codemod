const { buildDeclare, buildGet } = require('./builder');

function transformComp(path, j) {
  let arrowFunc = path.node.value.arguments[path.node.value.arguments.length - 1];

  path.node.value.arguments.splice(
    path.node.value.arguments.length - 1,
    1,
    j.functionDeclaration(
      j.identifier(''),
      [],
      j.blockStatement([
        ...path.node.value.arguments.slice(0, -1).map((arg, index) => {
          return buildDeclare(arrowFunc.params[index].name, arg.value, j);
        }),
        ...arrowFunc.body.body,
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
  if (node.type === 'NumericLiteral') {
    return node;
  }
  if (node.type === 'ArrowFunctionExpression') {
    return node;
  }
  if (node.type === 'ArrayExpression') {
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
        return j.conditionalExpression(...node.arguments.map((arg) => transformRec(arg, j)));
      case 'defaultTrue':
        console.error('TODO');
        return;
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
        console.error('TODO');
        return;
      case 'xor':
        console.error('TODO');
        return;

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
        console.error('TODO');
        return;

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
}

function extractMacroArguments(macroNode, j) {
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

  return macroNode.arguments
    .map((node, index) => {
      if (node.type === 'CallExpression' && node.callee.name !== 'raw') {
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

  path.node.value.arguments = [
    ...args,
    j.functionDeclaration(
      j.identifier(''),
      [],
      j.blockStatement([j.returnStatement(transformRec(path.node.value, j))])
    ),
  ];

  path.node.value.callee = j.identifier('computed');
}

module.exports = {
  transformMacro,
};
