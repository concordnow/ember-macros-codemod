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
