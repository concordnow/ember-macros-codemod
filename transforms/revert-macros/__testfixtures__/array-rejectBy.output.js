import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return get(this, "array").rejectBy('test', 2);
  }),
  prop2: computed("array.@each.test", function () {
    return get(this, "array").rejectBy('test');
  }),
});
