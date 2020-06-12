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
