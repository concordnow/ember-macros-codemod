import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").filter(item => item.test === 2);
  }),
});
