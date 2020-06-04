const { getParser } = require('codemod-cli').jscodeshift;
//const { getOptions } = require('codemod-cli');
const { transformMacro } = require('./macros');
const { cleanupImports } = require('./cleaner');

function findMacros(fileSource, j) {
  let macrosImported = new Set();
  j(fileSource)
    .find(j.ImportDeclaration)
    .filter((path) => {
      return (
        path.node.source.value === 'ember-awesome-macros' ||
        path.node.source.value === 'ember-macro-helpers/computed' ||
        path.node.source.value === 'ember-macro-helpers/raw'
      );
    })
    .forEach((path) => {
      path.node.specifiers.map((s) => s.local.name).forEach((i) => macrosImported.add(i));
    });
  return macrosImported;
}

module.exports = function transformer(file, api) {
  const j = getParser(api);
  //const options = getOptions();

  const macrosImported = findMacros(file.source, j);

  if (macrosImported.size) {
    let source = [...macrosImported].reduce((source, val) => {
      return j(source)
        .find(j.ObjectProperty, {
          value: {
            type: 'CallExpression',
            callee: {
              name: val,
            },
          },
        })
        .forEach((path) => {
          transformMacro(val, path, j);
        })
        .toSource();
    }, file.source);

    return cleanupImports(macrosImported, source, j);
  }

  return file.source;
};
