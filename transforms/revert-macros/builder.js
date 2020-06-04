function trimArrayName(varName) {
  return varName.replace(/\.\[\]$/, '').replace(/\.@each.*$/, '');
}

function buildDeclare(id, varName, j) {
  return j.variableDeclaration('let', [
    j.variableDeclarator(j.identifier(id), buildGet(varName, j)),
  ]);
}

function buildGet(varName, j) {
  return j.callExpression(j.identifier('get'), [
    j.thisExpression(),
    j.literal(trimArrayName(varName)),
  ]);
}

module.exports = {
  buildDeclare,
  buildGet,
};
