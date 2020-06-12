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
