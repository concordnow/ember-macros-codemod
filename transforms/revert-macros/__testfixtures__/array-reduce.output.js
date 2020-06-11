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
