# ember-macros-codemod


A collection of codemod's for [ember-macro-helpers](https://github.com/kellyselden/ember-macro-helpers) & [ember-awesome-macros](https://github.com/kellyselden/ember-awesome-macros).

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-macros-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-macros-codemod
ember-macros-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [revert-macros](transforms/revert-macros/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`
