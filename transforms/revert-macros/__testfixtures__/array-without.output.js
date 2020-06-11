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
