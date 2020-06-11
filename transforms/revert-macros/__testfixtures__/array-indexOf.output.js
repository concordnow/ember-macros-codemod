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
