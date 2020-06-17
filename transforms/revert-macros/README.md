# revert-macros


## Usage

```
npx ember-macros-codemod revert-macros path/of/files/ or/some**/*glob.js

# or

yarn global add ember-macros-codemod
ember-macros-codemod revert-macros path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [add](#add)
* [and](#and)
* [array-any](#array-any)
* [array-compact](#array-compact)
* [array-concat](#array-concat)
* [array-every](#array-every)
* [array-filter](#array-filter)
* [array-filterBy](#array-filterBy)
* [array-find](#array-find)
* [array-findBy](#array-findBy)
* [array-first](#array-first)
* [array-includes](#array-includes)
* [array-indexOf](#array-indexOf)
* [array-isAny](#array-isAny)
* [array-isEvery](#array-isEvery)
* [array-join](#array-join)
* [array-length](#array-length)
* [array-map](#array-map)
* [array-mapBy](#array-mapBy)
* [array-objectAt](#array-objectAt)
* [array-reduce](#array-reduce)
* [array-rejectBy](#array-rejectBy)
* [array-reverse](#array-reverse)
* [array-slice](#array-slice)
* [array-sort](#array-sort)
* [array-uniq](#array-uniq)
* [array-uniqBy](#array-uniqBy)
* [array-without](#array-without)
* [basic](#basic)
* [bool](#bool)
* [cleanup-import-1](#cleanup-import-1)
* [cleanup-import-2](#cleanup-import-2)
* [collect](#collect)
* [comp](#comp)
* [conditional](#conditional)
* [difference](#difference)
* [divide](#divide)
* [eq](#eq)
* [getBy](#getBy)
* [gt](#gt)
* [gte](#gte)
* [isEmpty](#isEmpty)
* [lt](#lt)
* [lte](#lte)
* [multiply](#multiply)
* [nand](#nand)
* [neq](#neq)
* [nor](#nor)
* [not](#not)
* [notEmpty](#notEmpty)
* [or](#or)
* [parseFloat](#parseFloat)
* [parseInt](#parseInt)
* [real-case-1](#real-case-1)
* [string-camelize](#string-camelize)
* [string-capitalize](#string-capitalize)
* [string-classify](#string-classify)
* [string-dasherize](#string-dasherize)
* [string-decamelize](#string-decamelize)
* [string-htmlSafe](#string-htmlSafe)
* [string-indexOf](#string-indexOf)
* [string-length](#string-length)
* [string-split](#string-split)
* [string-substr](#string-substr)
* [string-substring](#string-substring)
* [string-toLower](#string-toLower)
* [string-toUpper](#string-toUpper)
* [unless](#unless)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="add">**add**</a>

**Input** (<small>[add.input.js](transforms/revert-macros/__testfixtures__/add.input.js)</small>):
```js
import Component from '@ember/component';
import { add, sum, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: add('a', 'b'),
  prop2: sum('a', 'b'),
  prop3: add(or('a', 'b'), 'c'),
  prop4: add('a', 'b', 'c'),
});

```

**Output** (<small>[add.output.js](transforms/revert-macros/__testfixtures__/add.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") + get(this, "b");
  }),
  prop2: computed('a', 'b', function () {
    return get(this, "a") + get(this, "b");
  }),
  prop3: computed('a', 'b', 'c', function () {
    return (get(this, "a") || get(this, "b")) + get(this, "c");
  }),
  prop4: computed('a', 'b', 'c', function () {
    return get(this, "a") + get(this, "b") + get(this, "c");
  }),
});

```
---
<a id="and">**and**</a>

**Input** (<small>[and.input.js](transforms/revert-macros/__testfixtures__/and.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { and, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: and('a', 'b', 'c'),
  prop2: and('a', raw('b'), 'c'),
  prop3: and('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: and(gt('a', 'd'), raw('b'), 'c'),
});

```

**Output** (<small>[and.output.js](transforms/revert-macros/__testfixtures__/and.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return get(this, "a") && get(this, "b") && get(this, "c");
  }),
  prop2: computed('a', 'c', function () {
    return get(this, "a") && 'b' && get(this, "c");
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return get(this, "a.b.c") && get(this, "d.e.f") && get(this, "g.h.i");
  }),
  prop4: computed('a', 'd', 'c', function () {
    return get(this, "a") > get(this, "d") && 'b' && get(this, "c");
  }),
});

```
---
<a id="array-any">**array-any**</a>

**Input** (<small>[array-any.input.js](transforms/revert-macros/__testfixtures__/array-any.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.any('array', item => item.test),
});

```

**Output** (<small>[array-any.output.js](transforms/revert-macros/__testfixtures__/array-any.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").any(item => item.test);
  }),
});

```
---
<a id="array-compact">**array-compact**</a>

**Input** (<small>[array-compact.input.js](transforms/revert-macros/__testfixtures__/array-compact.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.compact('array'),
});

```

**Output** (<small>[array-compact.output.js](transforms/revert-macros/__testfixtures__/array-compact.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").compact();
  }),
});

```
---
<a id="array-concat">**array-concat**</a>

**Input** (<small>[array-concat.input.js](transforms/revert-macros/__testfixtures__/array-concat.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.concat('array', 'array2'),
});

```

**Output** (<small>[array-concat.output.js](transforms/revert-macros/__testfixtures__/array-concat.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", "array2.[]", function () {
    return get(this, "array").concat(get(this, "array2"));
  }),
});

```
---
<a id="array-every">**array-every**</a>

**Input** (<small>[array-every.input.js](transforms/revert-macros/__testfixtures__/array-every.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.every('array', item => item.test),
});

```

**Output** (<small>[array-every.output.js](transforms/revert-macros/__testfixtures__/array-every.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").every(item => item.test);
  }),
});

```
---
<a id="array-filter">**array-filter**</a>

**Input** (<small>[array-filter.input.js](transforms/revert-macros/__testfixtures__/array-filter.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.filter('array', item => item.test === 2),
});

```

**Output** (<small>[array-filter.output.js](transforms/revert-macros/__testfixtures__/array-filter.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").filter(item => item.test === 2);
  }),
});

```
---
<a id="array-filterBy">**array-filterBy**</a>

**Input** (<small>[array-filterBy.input.js](transforms/revert-macros/__testfixtures__/array-filterBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.filterBy('array', raw('test'), 2),
  prop2: array.filterBy('array', raw('test')),
  prop3: array.filterBy('array', raw('test'), null),
  prop4: array.filterBy('array', raw('test'), true),
});

```

**Output** (<small>[array-filterBy.output.js](transforms/revert-macros/__testfixtures__/array-filterBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").filterBy('test', 2);
  }),
  prop2: computed("array.@each.test", function () {
    return get(this, "array").filterBy('test');
  }),
  prop3: computed("array.@each.test", function () {
    return get(this, "array").filterBy('test', null);
  }),
  prop4: computed("array.@each.test", function () {
    return get(this, "array").filterBy('test', true);
  }),
});

```
---
<a id="array-find">**array-find**</a>

**Input** (<small>[array-find.input.js](transforms/revert-macros/__testfixtures__/array-find.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.find('array', item => item.test === 2),
});

```

**Output** (<small>[array-find.output.js](transforms/revert-macros/__testfixtures__/array-find.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").find(item => item.test === 2);
  }),
});

```
---
<a id="array-findBy">**array-findBy**</a>

**Input** (<small>[array-findBy.input.js](transforms/revert-macros/__testfixtures__/array-findBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.findBy('array', raw('test'), 2),
  prop2: array.findBy('array', raw('test')),
});

```

**Output** (<small>[array-findBy.output.js](transforms/revert-macros/__testfixtures__/array-findBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").findBy('test', 2);
  }),
  prop2: computed("array.@each.test", function () {
    return get(this, "array").findBy('test');
  }),
});

```
---
<a id="array-first">**array-first**</a>

**Input** (<small>[array-first.input.js](transforms/revert-macros/__testfixtures__/array-first.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.first('array'),
});

```

**Output** (<small>[array-first.output.js](transforms/revert-macros/__testfixtures__/array-first.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array")[0];
  }),
});

```
---
<a id="array-includes">**array-includes**</a>

**Input** (<small>[array-includes.input.js](transforms/revert-macros/__testfixtures__/array-includes.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.includes('array', raw('item')),
  prop2: array.includes('array', 'item'),
});

```

**Output** (<small>[array-includes.output.js](transforms/revert-macros/__testfixtures__/array-includes.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").includes('item');
  }),
  prop2: computed("array.[]", 'item', function () {
    return get(this, "array").includes(get(this, "item"));
  }),
});

```
---
<a id="array-indexOf">**array-indexOf**</a>

**Input** (<small>[array-indexOf.input.js](transforms/revert-macros/__testfixtures__/array-indexOf.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.indexOf('array', raw('item')),
  prop2: array.indexOf('array', 'item'),
});

```

**Output** (<small>[array-indexOf.output.js](transforms/revert-macros/__testfixtures__/array-indexOf.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").indexOf('item');
  }),
  prop2: computed("array.[]", 'item', function () {
    return get(this, "array").indexOf(get(this, "item"));
  }),
});

```
---
<a id="array-isAny">**array-isAny**</a>

**Input** (<small>[array-isAny.input.js](transforms/revert-macros/__testfixtures__/array-isAny.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.isAny('array', raw('test'), 2),
  prop2: array.isAny('array', raw('test')),
});

```

**Output** (<small>[array-isAny.output.js](transforms/revert-macros/__testfixtures__/array-isAny.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").isAny('test', 2);
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").isAny('test');
  }),
});

```
---
<a id="array-isEvery">**array-isEvery**</a>

**Input** (<small>[array-isEvery.input.js](transforms/revert-macros/__testfixtures__/array-isEvery.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.isEvery('array', raw('test'), 2),
  prop2: array.isEvery('array', raw('test')),
});

```

**Output** (<small>[array-isEvery.output.js](transforms/revert-macros/__testfixtures__/array-isEvery.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").isEvery('test', 2);
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").isEvery('test');
  }),
});

```
---
<a id="array-join">**array-join**</a>

**Input** (<small>[array-join.input.js](transforms/revert-macros/__testfixtures__/array-join.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.join('array', raw('sep')),
  prop2: array.join('array', 'sep'),
});

```

**Output** (<small>[array-join.output.js](transforms/revert-macros/__testfixtures__/array-join.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").join('sep');
  }),
  prop2: computed("array.[]", 'sep', function () {
    return get(this, "array").join(get(this, "sep"));
  }),
});

```
---
<a id="array-length">**array-length**</a>

**Input** (<small>[array-length.input.js](transforms/revert-macros/__testfixtures__/array-length.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.length('array'),
});

```

**Output** (<small>[array-length.output.js](transforms/revert-macros/__testfixtures__/array-length.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").length;
  }),
});

```
---
<a id="array-map">**array-map**</a>

**Input** (<small>[array-map.input.js](transforms/revert-macros/__testfixtures__/array-map.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.map('array', (item) => item.test),
});

```

**Output** (<small>[array-map.output.js](transforms/revert-macros/__testfixtures__/array-map.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").map((item) => item.test);
  }),
});

```
---
<a id="array-mapBy">**array-mapBy**</a>

**Input** (<small>[array-mapBy.input.js](transforms/revert-macros/__testfixtures__/array-mapBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.mapBy('array', raw('test')),
});

```

**Output** (<small>[array-mapBy.output.js](transforms/revert-macros/__testfixtures__/array-mapBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").mapBy('test');
  }),
});

```
---
<a id="array-objectAt">**array-objectAt**</a>

**Input** (<small>[array-objectAt.input.js](transforms/revert-macros/__testfixtures__/array-objectAt.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.objectAt('array', raw(0)),
  prop2: array.objectAt('array', 'index'),
});

```

**Output** (<small>[array-objectAt.output.js](transforms/revert-macros/__testfixtures__/array-objectAt.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").objectAt(0);
  }),
  prop2: computed("array.[]", 'index', function () {
    return get(this, "array").objectAt(get(this, "index"));
  }),
});

```
---
<a id="array-reduce">**array-reduce**</a>

**Input** (<small>[array-reduce.input.js](transforms/revert-macros/__testfixtures__/array-reduce.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.reduce('array', (arr, cur, i) => arr.concat(cur, i), []),
  prop2: array.reduce('array', (acc, cur, i) => acc + cur),
});

```

**Output** (<small>[array-reduce.output.js](transforms/revert-macros/__testfixtures__/array-reduce.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").reduce((arr, cur, i) => arr.concat(cur, i), []);
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").reduce((acc, cur, i) => acc + cur);
  }),
});

```
---
<a id="array-rejectBy">**array-rejectBy**</a>

**Input** (<small>[array-rejectBy.input.js](transforms/revert-macros/__testfixtures__/array-rejectBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.rejectBy('array', raw('test'), 2),
  prop2: array.rejectBy('array', raw('test')),
});

```

**Output** (<small>[array-rejectBy.output.js](transforms/revert-macros/__testfixtures__/array-rejectBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").rejectBy('test', 2);
  }),
  prop2: computed("array.@each.test", function () {
    return get(this, "array").rejectBy('test');
  }),
});

```
---
<a id="array-reverse">**array-reverse**</a>

**Input** (<small>[array-reverse.input.js](transforms/revert-macros/__testfixtures__/array-reverse.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.reverse('array'),
});

```

**Output** (<small>[array-reverse.output.js](transforms/revert-macros/__testfixtures__/array-reverse.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").reverse();
  }),
});

```
---
<a id="array-slice">**array-slice**</a>

**Input** (<small>[array-slice.input.js](transforms/revert-macros/__testfixtures__/array-slice.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.slice('array', 1, 2),
  prop2: array.slice('array', 1),
  prop3: array.slice('array', 'index'),
});

```

**Output** (<small>[array-slice.output.js](transforms/revert-macros/__testfixtures__/array-slice.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").slice(1, 2);
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").slice(1);
  }),
  prop3: computed("array.[]", 'index', function () {
    return get(this, "array").slice(get(this, "index"));
  }),
});

```
---
<a id="array-sort">**array-sort**</a>

**Input** (<small>[array-sort.input.js](transforms/revert-macros/__testfixtures__/array-sort.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.sort('array'),
  prop2: array.sort('array', (a, b) => a.key < b.key),
});

```

**Output** (<small>[array-sort.output.js](transforms/revert-macros/__testfixtures__/array-sort.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").sort();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").sort((a, b) => a.key < b.key);
  }),
});

```
---
<a id="array-uniq">**array-uniq**</a>

**Input** (<small>[array-uniq.input.js](transforms/revert-macros/__testfixtures__/array-uniq.input.js)</small>):
```js
import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.uniq('array'),
});

```

**Output** (<small>[array-uniq.output.js](transforms/revert-macros/__testfixtures__/array-uniq.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").uniq();
  }),
});

```
---
<a id="array-uniqBy">**array-uniqBy**</a>

**Input** (<small>[array-uniqBy.input.js](transforms/revert-macros/__testfixtures__/array-uniqBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.uniqBy('array', raw('test')),
});

```

**Output** (<small>[array-uniqBy.output.js](transforms/revert-macros/__testfixtures__/array-uniqBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").uniqBy('test');
  }),
});

```
---
<a id="array-without">**array-without**</a>

**Input** (<small>[array-without.input.js](transforms/revert-macros/__testfixtures__/array-without.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.without('array', 'item'),
  prop2: array.without('array', raw('item')),
});

```

**Output** (<small>[array-without.output.js](transforms/revert-macros/__testfixtures__/array-without.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", 'item', function () {
    return get(this, "array").without(get(this, "item"));
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").without('item');
  }),
});

```
---
<a id="basic">**basic**</a>

**Input** (<small>[basic.input.js](transforms/revert-macros/__testfixtures__/basic.input.js)</small>):
```js

```

**Output** (<small>[basic.output.js](transforms/revert-macros/__testfixtures__/basic.output.js)</small>):
```js

```
---
<a id="bool">**bool**</a>

**Input** (<small>[bool.input.js](transforms/revert-macros/__testfixtures__/bool.input.js)</small>):
```js
import Component from '@ember/component';
import { bool, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: bool('a'),
  prop2: bool(conditional('a', 'b', 'c')),
});

```

**Output** (<small>[bool.output.js](transforms/revert-macros/__testfixtures__/bool.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return !!get(this, "a");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return !!(get(this, "a") ? get(this, "b") : get(this, "c"));
  }),
});

```
---
<a id="cleanup-import-1">**cleanup-import-1**</a>

**Input** (<small>[cleanup-import-1.input.js](transforms/revert-macros/__testfixtures__/cleanup-import-1.input.js)</small>):
```js
import Component from '@ember/component';
import { computed } from '@ember/object';
import comp from 'ember-macro-helpers/computed';

export default Component.extend({
  prop1: comp('a', (a) => {
    // do something
    return a;
  }),
});

```

**Output** (<small>[cleanup-import-1.output.js](transforms/revert-macros/__testfixtures__/cleanup-import-1.output.js)</small>):
```js
import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  prop1: computed('a', function () {
    let a = get(this, "a");
    // do something
    return a;
  }),
});

```
---
<a id="cleanup-import-2">**cleanup-import-2**</a>

**Input** (<small>[cleanup-import-2.input.js](transforms/revert-macros/__testfixtures__/cleanup-import-2.input.js)</small>):
```js
import Component from '@ember/component';
import { get } from '@ember/object';
import comp from 'ember-macro-helpers/computed';

export default Component.extend({
  prop1: comp('a', (a) => {
    // do something
    return a;
  }),
});

```

**Output** (<small>[cleanup-import-2.output.js](transforms/revert-macros/__testfixtures__/cleanup-import-2.output.js)</small>):
```js
import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
  prop1: computed('a', function () {
    let a = get(this, "a");
    // do something
    return a;
  }),
});

```
---
<a id="collect">**collect**</a>

**Input** (<small>[collect.input.js](transforms/revert-macros/__testfixtures__/collect.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { collect } from 'ember-awesome-macros';

export default Component.extend({
  prop1: collect('a', 'b', 'c'),
  prop2: collect('a', raw('b'), 'c'),
});

```

**Output** (<small>[collect.output.js](transforms/revert-macros/__testfixtures__/collect.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return [get(this, "a"), get(this, "b"), get(this, "c")];
  }),
  prop2: computed('a', 'c', function () {
    return [get(this, "a"), 'b', get(this, "c")];
  }),
});

```
---
<a id="comp">**comp**</a>

**Input** (<small>[comp.input.js](transforms/revert-macros/__testfixtures__/comp.input.js)</small>):
```js
import Component from '@ember/component';
import comp from 'ember-macro-helpers/computed';

export default Component.extend({
  prop1: comp('a', (a) => {
    // do something
    return a;
  }),
  prop2: comp('a', 'b', 'c', (a, b, c) => {
    // do something
    return a + b + c;
  }),
  prop3: comp('a.[]', 'b.@each.c', (a, b) => {
    // do something
    return a + b;
  }),
  prop4: comp('a.b.c', (c) => {
    // do something
    return c;
  }),

  prop5: comp('a', (foo) => {
    // do something
    return foo;
  }),
  prop6: comp('a', 'b', 'c', (foo, bar, baz) => {
    // do something
    return foo + bar + baz;
  }),
  prop7: comp('a.[]', 'b.@each.c', (foo, bar) => {
    // do something
    return foo + bar;
  }),
  prop8: comp('a.b.c', (foo) => {
    // do something
    return foo;
  }),

  prop9: comp('a', (foo) => foo),
  prop10: comp(() => foo()),
});

```

**Output** (<small>[comp.output.js](transforms/revert-macros/__testfixtures__/comp.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    let a = get(this, "a");
    // do something
    return a;
  }),
  prop2: computed('a', 'b', 'c', function () {
    let a = get(this, "a");
    let b = get(this, "b");
    let c = get(this, "c");
    // do something
    return a + b + c;
  }),
  prop3: computed('a.[]', 'b.@each.c', function () {
    let a = get(this, "a");
    let b = get(this, "b");
    // do something
    return a + b;
  }),
  prop4: computed('a.b.c', function () {
    let c = get(this, "a.b.c");
    // do something
    return c;
  }),

  prop5: computed('a', function () {
    let foo = get(this, "a");
    // do something
    return foo;
  }),
  prop6: computed('a', 'b', 'c', function () {
    let foo = get(this, "a");
    let bar = get(this, "b");
    let baz = get(this, "c");
    // do something
    return foo + bar + baz;
  }),
  prop7: computed('a.[]', 'b.@each.c', function () {
    let foo = get(this, "a");
    let bar = get(this, "b");
    // do something
    return foo + bar;
  }),
  prop8: computed('a.b.c', function () {
    let foo = get(this, "a.b.c");
    // do something
    return foo;
  }),

  prop9: computed('a', function () {
    let foo = get(this, "a");
    return foo;
  }),
  prop10: computed(function () {
    return foo();
  }),
});

```
---
<a id="conditional">**conditional**</a>

**Input** (<small>[conditional.input.js](transforms/revert-macros/__testfixtures__/conditional.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { conditional, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: conditional('a', 'b', 'c'),
  prop2: conditional('a', raw('b'), 'c'),
  prop3: conditional('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: conditional(gt('a', 'd'), raw('b'), 'c'),
  prop5: conditional('a', 'b'),
});

```

**Output** (<small>[conditional.output.js](transforms/revert-macros/__testfixtures__/conditional.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return get(this, "a") ? get(this, "b") : get(this, "c");
  }),
  prop2: computed('a', 'c', function () {
    return get(this, "a") ? 'b' : get(this, "c");
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return get(this, "a.b.c") ? get(this, "d.e.f") : get(this, "g.h.i");
  }),
  prop4: computed('a', 'd', 'c', function () {
    return get(this, "a") > get(this, "d") ? 'b' : get(this, "c");
  }),
  prop5: computed('a', 'b', function () {
    return get(this, "a") ? get(this, "b") : undefined;
  }),
});

```
---
<a id="difference">**difference**</a>

**Input** (<small>[difference.input.js](transforms/revert-macros/__testfixtures__/difference.input.js)</small>):
```js
import Component from '@ember/component';
import { difference, substract, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: difference('a', 'b'),
  prop2: substract('a', 'b'),
  prop3: difference(or('a', 'b'), 'c'),
  prop4: difference('a', 'b', 'c'),
});

```

**Output** (<small>[difference.output.js](transforms/revert-macros/__testfixtures__/difference.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") - get(this, "b");
  }),
  prop2: computed('a', 'b', function () {
    return get(this, "a") - get(this, "b");
  }),
  prop3: computed('a', 'b', 'c', function () {
    return (get(this, "a") || get(this, "b")) - get(this, "c");
  }),
  prop4: computed('a', 'b', 'c', function () {
    return get(this, "a") - get(this, "b") - get(this, "c");
  }),
});

```
---
<a id="divide">**divide**</a>

**Input** (<small>[divide.input.js](transforms/revert-macros/__testfixtures__/divide.input.js)</small>):
```js
import Component from '@ember/component';
import { divide, quotient, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: divide('a', 'b'),
  prop2: quotient('a', 'b'),
  prop3: divide(or('a', 'b'), 'c'),
  prop4: divide('a', 'b', 'c'),
});

```

**Output** (<small>[divide.output.js](transforms/revert-macros/__testfixtures__/divide.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") / get(this, "b");
  }),
  prop2: computed('a', 'b', function () {
    return get(this, "a") / get(this, "b");
  }),
  prop3: computed('a', 'b', 'c', function () {
    return (get(this, "a") || get(this, "b")) / get(this, "c");
  }),
  prop4: computed('a', 'b', 'c', function () {
    return get(this, "a") / get(this, "b") / get(this, "c");
  }),
});

```
---
<a id="eq">**eq**</a>

**Input** (<small>[eq.input.js](transforms/revert-macros/__testfixtures__/eq.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { eq, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: eq('a', 'b'),
  prop2: eq('a', 'b', 'c'),
  prop3: eq(gt('a', 'b'), raw('c'), 'd'),
  prop4: eq('a', 4),
  prop5: eq('a', -1),
});

```

**Output** (<small>[eq.output.js](transforms/revert-macros/__testfixtures__/eq.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") === get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") === get(this, "b") && get(this, "a") === get(this, "c");
  }),
  prop3: computed('a', 'b', 'd', function () {
    return get(this, "a") > get(this, "b") === 'c' && get(this, "a") > get(this, "b") === get(this, "d");
  }),
  prop4: computed('a', function () {
    return get(this, "a") === 4;
  }),
  prop5: computed('a', function () {
    return get(this, "a") === -1;
  }),
});

```
---
<a id="getBy">**getBy**</a>

**Input** (<small>[getBy.input.js](transforms/revert-macros/__testfixtures__/getBy.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { getBy } from 'ember-awesome-macros';

export default Component.extend({
  prop1: getBy('obj', 'key'),
  prop2: getBy('obj', raw('key')),
});

```

**Output** (<small>[getBy.output.js](transforms/revert-macros/__testfixtures__/getBy.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('obj', 'key', function () {
    return get(get(this, "obj"), get(this, "key"));
  }),
  prop2: computed('obj', function () {
    return get(get(this, "obj"), 'key');
  }),
});

```
---
<a id="gt">**gt**</a>

**Input** (<small>[gt.input.js](transforms/revert-macros/__testfixtures__/gt.input.js)</small>):
```js
import Component from '@ember/component';
import { gt, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: gt('a', 'b'),
  prop2: gt(add('a', 'b'), 'c'),
});

```

**Output** (<small>[gt.output.js](transforms/revert-macros/__testfixtures__/gt.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") > get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") + get(this, "b") > get(this, "c");
  }),
});

```
---
<a id="gte">**gte**</a>

**Input** (<small>[gte.input.js](transforms/revert-macros/__testfixtures__/gte.input.js)</small>):
```js
import Component from '@ember/component';
import { gte, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: gte('a', 'b'),
  prop2: gte(add('a', 'b'), 'c'),
});

```

**Output** (<small>[gte.output.js](transforms/revert-macros/__testfixtures__/gte.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") >= get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") + get(this, "b") >= get(this, "c");
  }),
});

```
---
<a id="isEmpty">**isEmpty**</a>

**Input** (<small>[isEmpty.input.js](transforms/revert-macros/__testfixtures__/isEmpty.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, isEmpty } from 'ember-awesome-macros';

export default Component.extend({
  prop1: isEmpty('string'),
  prop2: isEmpty(array.join('array', raw(','))),
});

```

**Output** (<small>[isEmpty.output.js](transforms/revert-macros/__testfixtures__/isEmpty.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return isEmpty(get(this, "string"));
  }),
  prop2: computed("array.[]", function () {
    return isEmpty(get(this, "array").join(','));
  }),
});

```
---
<a id="lt">**lt**</a>

**Input** (<small>[lt.input.js](transforms/revert-macros/__testfixtures__/lt.input.js)</small>):
```js
import Component from '@ember/component';
import { lt, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: lt('a', 'b'),
  prop2: lt(add('a', 'b'), 'c'),
});

```

**Output** (<small>[lt.output.js](transforms/revert-macros/__testfixtures__/lt.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") < get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") + get(this, "b") < get(this, "c");
  }),
});

```
---
<a id="lte">**lte**</a>

**Input** (<small>[lte.input.js](transforms/revert-macros/__testfixtures__/lte.input.js)</small>):
```js
import Component from '@ember/component';
import { lte, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: lte('a', 'b'),
  prop2: lte(add('a', 'b'), 'c'),
});

```

**Output** (<small>[lte.output.js](transforms/revert-macros/__testfixtures__/lte.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") <= get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") + get(this, "b") <= get(this, "c");
  }),
});

```
---
<a id="multiply">**multiply**</a>

**Input** (<small>[multiply.input.js](transforms/revert-macros/__testfixtures__/multiply.input.js)</small>):
```js
import Component from '@ember/component';
import { multiply, product, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: multiply('a', 'b'),
  prop2: product('a', 'b'),
  prop3: multiply(or('a', 'b'), 'c'),
  prop4: multiply('a', 'b', 'c'),
});

```

**Output** (<small>[multiply.output.js](transforms/revert-macros/__testfixtures__/multiply.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") * get(this, "b");
  }),
  prop2: computed('a', 'b', function () {
    return get(this, "a") * get(this, "b");
  }),
  prop3: computed('a', 'b', 'c', function () {
    return (get(this, "a") || get(this, "b")) * get(this, "c");
  }),
  prop4: computed('a', 'b', 'c', function () {
    return get(this, "a") * get(this, "b") * get(this, "c");
  }),
});

```
---
<a id="nand">**nand**</a>

**Input** (<small>[nand.input.js](transforms/revert-macros/__testfixtures__/nand.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { nand, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: nand('a', 'b', 'c'),
  prop2: nand('a', raw('b'), 'c'),
  prop3: nand('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: nand(gt('a', 'd'), raw('b'), 'c'),
});

```

**Output** (<small>[nand.output.js](transforms/revert-macros/__testfixtures__/nand.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return !(get(this, "a") && get(this, "b") && get(this, "c"));
  }),
  prop2: computed('a', 'c', function () {
    return !(get(this, "a") && 'b' && get(this, "c"));
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return !(get(this, "a.b.c") && get(this, "d.e.f") && get(this, "g.h.i"));
  }),
  prop4: computed('a', 'd', 'c', function () {
    return !(get(this, "a") > get(this, "d") && 'b' && get(this, "c"));
  }),
});

```
---
<a id="neq">**neq**</a>

**Input** (<small>[neq.input.js](transforms/revert-macros/__testfixtures__/neq.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { neq, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: neq('a', 'b'),
  prop2: neq('a', 'b', 'c'),
  prop3: neq(gt('a', 'b'), raw('c'), 'd'),
});

```

**Output** (<small>[neq.output.js](transforms/revert-macros/__testfixtures__/neq.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") !== get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") !== get(this, "b") && get(this, "a") !== get(this, "c");
  }),
  prop3: computed('a', 'b', 'd', function () {
    return get(this, "a") > get(this, "b") !== 'c' && get(this, "a") > get(this, "b") !== get(this, "d");
  }),
});

```
---
<a id="nor">**nor**</a>

**Input** (<small>[nor.input.js](transforms/revert-macros/__testfixtures__/nor.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { nor, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: nor('a', 'b', 'c'),
  prop2: nor('a', raw('b'), 'c'),
  prop3: nor('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: nor(gt('a', 'd'), raw('b'), 'c'),
});

```

**Output** (<small>[nor.output.js](transforms/revert-macros/__testfixtures__/nor.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return !(get(this, "a") || get(this, "b") || get(this, "c"));
  }),
  prop2: computed('a', 'c', function () {
    return !(get(this, "a") || 'b' || get(this, "c"));
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return !(get(this, "a.b.c") || get(this, "d.e.f") || get(this, "g.h.i"));
  }),
  prop4: computed('a', 'd', 'c', function () {
    return !(get(this, "a") > get(this, "d") || 'b' || get(this, "c"));
  }),
});

```
---
<a id="not">**not**</a>

**Input** (<small>[not.input.js](transforms/revert-macros/__testfixtures__/not.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { gt, not } from 'ember-awesome-macros';

export default Component.extend({
  prop1: not('a'),
  prop2: not(gt('a', 'b')),
});

```

**Output** (<small>[not.output.js](transforms/revert-macros/__testfixtures__/not.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return !get(this, "a");
  }),
  prop2: computed('a', 'b', function () {
    return !(get(this, "a") > get(this, "b"));
  }),
});

```
---
<a id="notEmpty">**notEmpty**</a>

**Input** (<small>[notEmpty.input.js](transforms/revert-macros/__testfixtures__/notEmpty.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, notEmpty } from 'ember-awesome-macros';

export default Component.extend({
  prop1: notEmpty('string'),
  prop2: notEmpty(array.join('array', raw(','))),
});

```

**Output** (<small>[notEmpty.output.js](transforms/revert-macros/__testfixtures__/notEmpty.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return !isEmpty(get(this, "string"));
  }),
  prop2: computed("array.[]", function () {
    return !isEmpty(get(this, "array").join(','));
  }),
});

```
---
<a id="or">**or**</a>

**Input** (<small>[or.input.js](transforms/revert-macros/__testfixtures__/or.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { or, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: or('a', 'b', 'c'),
  prop2: or('a', raw('b'), 'c'),
  prop3: or('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: or(gt('a', 'd'), raw('b'), 'c'),
});

```

**Output** (<small>[or.output.js](transforms/revert-macros/__testfixtures__/or.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return get(this, "a") || get(this, "b") || get(this, "c");
  }),
  prop2: computed('a', 'c', function () {
    return get(this, "a") || 'b' || get(this, "c");
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return get(this, "a.b.c") || get(this, "d.e.f") || get(this, "g.h.i");
  }),
  prop4: computed('a', 'd', 'c', function () {
    return get(this, "a") > get(this, "d") || 'b' || get(this, "c");
  }),
});

```
---
<a id="parseFloat">**parseFloat**</a>

**Input** (<small>[parseFloat.input.js](transforms/revert-macros/__testfixtures__/parseFloat.input.js)</small>):
```js
import Component from '@ember/component';
import { parseFloat, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: parseFloat('a'),
  prop2: parseFloat(conditional('a', 'b', 'c')),
});

```

**Output** (<small>[parseFloat.output.js](transforms/revert-macros/__testfixtures__/parseFloat.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return parseFloat(get(this, "a"));
  }),
  prop2: computed('a', 'b', 'c', function () {
    return parseFloat(get(this, "a") ? get(this, "b") : get(this, "c"));
  }),
});

```
---
<a id="parseInt">**parseInt**</a>

**Input** (<small>[parseInt.input.js](transforms/revert-macros/__testfixtures__/parseInt.input.js)</small>):
```js
import Component from '@ember/component';
import { parseInt, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: parseInt('a'),
  prop2: parseInt(conditional('a', 'b', 'c')),
  prop3: parseInt(conditional('a', 'b', 'c'), 1),
});

```

**Output** (<small>[parseInt.output.js](transforms/revert-macros/__testfixtures__/parseInt.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return parseInt(get(this, "a"));
  }),
  prop2: computed('a', 'b', 'c', function () {
    return parseInt(get(this, "a") ? get(this, "b") : get(this, "c"));
  }),
  prop3: computed('a', 'b', 'c', function () {
    return parseInt(get(this, "a") ? get(this, "b") : get(this, "c"), 1);
  }),
});

```
---
<a id="real-case-1">**real-case-1**</a>

**Input** (<small>[real-case-1.input.js](transforms/revert-macros/__testfixtures__/real-case-1.input.js)</small>):
```js

```

**Output** (<small>[real-case-1.output.js](transforms/revert-macros/__testfixtures__/real-case-1.output.js)</small>):
```js

```
---
<a id="string-camelize">**string-camelize**</a>

**Input** (<small>[string-camelize.input.js](transforms/revert-macros/__testfixtures__/string-camelize.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.camelize('string'),
  prop2: string.camelize(array.join('array')),
});

```

**Output** (<small>[string-camelize.output.js](transforms/revert-macros/__testfixtures__/string-camelize.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").camelize();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().camelize();
  }),
});

```
---
<a id="string-capitalize">**string-capitalize**</a>

**Input** (<small>[string-capitalize.input.js](transforms/revert-macros/__testfixtures__/string-capitalize.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.capitalize('string'),
  prop2: string.capitalize(array.join('array')),
});

```

**Output** (<small>[string-capitalize.output.js](transforms/revert-macros/__testfixtures__/string-capitalize.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").capitalize();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().capitalize();
  }),
});

```
---
<a id="string-classify">**string-classify**</a>

**Input** (<small>[string-classify.input.js](transforms/revert-macros/__testfixtures__/string-classify.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.classify('string'),
  prop2: string.classify(array.join('array')),
});

```

**Output** (<small>[string-classify.output.js](transforms/revert-macros/__testfixtures__/string-classify.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").classify();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().classify();
  }),
});

```
---
<a id="string-dasherize">**string-dasherize**</a>

**Input** (<small>[string-dasherize.input.js](transforms/revert-macros/__testfixtures__/string-dasherize.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.dasherize('string'),
  prop2: string.dasherize(array.join('array')),
});

```

**Output** (<small>[string-dasherize.output.js](transforms/revert-macros/__testfixtures__/string-dasherize.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").dasherize();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().dasherize();
  }),
});

```
---
<a id="string-decamelize">**string-decamelize**</a>

**Input** (<small>[string-decamelize.input.js](transforms/revert-macros/__testfixtures__/string-decamelize.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.decamelize('string'),
  prop2: string.decamelize(array.join('array')),
});

```

**Output** (<small>[string-decamelize.output.js](transforms/revert-macros/__testfixtures__/string-decamelize.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").decamelize();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().decamelize();
  }),
});

```
---
<a id="string-htmlSafe">**string-htmlSafe**</a>

**Input** (<small>[string-htmlSafe.input.js](transforms/revert-macros/__testfixtures__/string-htmlSafe.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.htmlSafe('string'),
  prop2: string.htmlSafe(array.join('array', raw(','))),
});

```

**Output** (<small>[string-htmlSafe.output.js](transforms/revert-macros/__testfixtures__/string-htmlSafe.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return htmlSafe(get(this, "string"));
  }),
  prop2: computed("array.[]", function () {
    return htmlSafe(get(this, "array").join(','));
  }),
});

```
---
<a id="string-indexOf">**string-indexOf**</a>

**Input** (<small>[string-indexOf.input.js](transforms/revert-macros/__testfixtures__/string-indexOf.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.indexOf('string', raw('item')),
  prop2: string.indexOf('string', 'item'),
});

```

**Output** (<small>[string-indexOf.output.js](transforms/revert-macros/__testfixtures__/string-indexOf.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").indexOf('item');
  }),
  prop2: computed('string', 'item', function () {
    return get(this, "string").indexOf(get(this, "item"));
  }),
});

```
---
<a id="string-length">**string-length**</a>

**Input** (<small>[string-length.input.js](transforms/revert-macros/__testfixtures__/string-length.input.js)</small>):
```js
import Component from '@ember/component';
import { string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.length('string'),
});

```

**Output** (<small>[string-length.output.js](transforms/revert-macros/__testfixtures__/string-length.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").length;
  }),
});

```
---
<a id="string-split">**string-split**</a>

**Input** (<small>[string-split.input.js](transforms/revert-macros/__testfixtures__/string-split.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.split('string', 'key'),
  prop2: string.split(array.join('array'), raw(',')),
});

```

**Output** (<small>[string-split.output.js](transforms/revert-macros/__testfixtures__/string-split.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', 'key', function () {
    return get(this, "string").split(get(this, "key"));
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().split(',');
  }),
});

```
---
<a id="string-substr">**string-substr**</a>

**Input** (<small>[string-substr.input.js](transforms/revert-macros/__testfixtures__/string-substr.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.substr('string', 'key'),
  prop2: string.substr('string', 1),
  prop3: string.substr(array.join('array'), 1, 2),
});

```

**Output** (<small>[string-substr.output.js](transforms/revert-macros/__testfixtures__/string-substr.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', 'key', function () {
    return get(this, "string").substr(get(this, "key"));
  }),
  prop2: computed('string', function () {
    return get(this, "string").substr(1);
  }),
  prop3: computed("array.[]", function () {
    return get(this, "array").join().substr(1, 2);
  }),
});

```
---
<a id="string-substring">**string-substring**</a>

**Input** (<small>[string-substring.input.js](transforms/revert-macros/__testfixtures__/string-substring.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.substring('string', 'key'),
  prop2: string.substring('string', 1),
  prop3: string.substring(array.join('array'), 1, 2),
});

```

**Output** (<small>[string-substring.output.js](transforms/revert-macros/__testfixtures__/string-substring.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', 'key', function () {
    return get(this, "string").substring(get(this, "key"));
  }),
  prop2: computed('string', function () {
    return get(this, "string").substring(1);
  }),
  prop3: computed("array.[]", function () {
    return get(this, "array").join().substring(1, 2);
  }),
});

```
---
<a id="string-toLower">**string-toLower**</a>

**Input** (<small>[string-toLower.input.js](transforms/revert-macros/__testfixtures__/string-toLower.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.toLower('string'),
  prop2: string.toLower(array.join('array')),
});

```

**Output** (<small>[string-toLower.output.js](transforms/revert-macros/__testfixtures__/string-toLower.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").toLowerCase();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().toLowerCase();
  }),
});

```
---
<a id="string-toUpper">**string-toUpper**</a>

**Input** (<small>[string-toUpper.input.js](transforms/revert-macros/__testfixtures__/string-toUpper.input.js)</small>):
```js
import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.toUpper('string'),
  prop2: string.toUpper(array.join('array')),
});

```

**Output** (<small>[string-toUpper.output.js](transforms/revert-macros/__testfixtures__/string-toUpper.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").toUpperCase();
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().toUpperCase();
  }),
});

```
---
<a id="unless">**unless**</a>

**Input** (<small>[unless.input.js](transforms/revert-macros/__testfixtures__/unless.input.js)</small>):
```js
import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { unless, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: unless('a', 'b', 'c'),
  prop2: unless('a', raw('b'), 'c'),
  prop3: unless('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: unless(gt('a', 'd'), raw('b'), 'c'),
});

```

**Output** (<small>[unless.output.js](transforms/revert-macros/__testfixtures__/unless.output.js)</small>):
```js
import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return !get(this, "a") ? get(this, "b") : get(this, "c");
  }),
  prop2: computed('a', 'c', function () {
    return !get(this, "a") ? 'b' : get(this, "c");
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return !get(this, "a.b.c") ? get(this, "d.e.f") : get(this, "g.h.i");
  }),
  prop4: computed('a', 'd', 'c', function () {
    return !(get(this, "a") > get(this, "d")) ? 'b' : get(this, "c");
  }),
});

```
<!--FIXTURES_CONTENT_END-->
