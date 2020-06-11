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
