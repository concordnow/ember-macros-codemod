import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").includes('item');
  }),
  prop2: computed("array.[]", 'item', function () {
    return get(this, "array").includes(get(this, "item"));
  }),
});
