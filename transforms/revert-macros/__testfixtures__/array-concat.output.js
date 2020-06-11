import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", "array2.[]", function () {
    return get(this, "array").concat(get(this, "array2"));
  }),
});
