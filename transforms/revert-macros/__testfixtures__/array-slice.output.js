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
