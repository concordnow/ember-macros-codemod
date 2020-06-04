const { buildDeclare, buildGet } = require('./builder');

function canTransformMacro(path) {
  return path.node.value.arguments.every((arg) => {
    return (
      arg.type === 'StringLiteral' ||
      (arg.type === 'CallExpression' && arg.callee.name === 'raw') ||
      arg.type === 'ArrowFunctionExpression'
    );
  });
}

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

function transformConditional(path, j) {
  let props = path.node.value.arguments.map((node) => {
    if (node.type === 'StringLiteral') {
      return buildGet(node.value, j);
    }
    // raw value
    return node.arguments[0];
  });

  path.node.value.arguments = path.node.value.arguments.filter((node) => {
    return node.type === 'StringLiteral';
  });

  path.node.value.arguments.push(
    j.functionDeclaration(
      j.identifier(''),
      [],
      j.blockStatement([j.returnStatement(j.conditionalExpression(...props))])
    )
  );

  path.node.value.callee = j.identifier('computed');
}

function transformMacro(macroId, path, j) {
  if (!canTransformMacro(path)) {
    return;
  }

  switch (macroId) {
    case 'comp':
      return transformComp(path, j);
    case 'conditional':
      return transformConditional(path, j);
  }
}

module.exports = {
  transformMacro,
};
