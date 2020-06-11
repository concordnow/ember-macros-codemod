import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.[]", function () {
    return get(this, "array").objectAt(0);
  }),
  prop2: computed("array.[]", 'index', function () {
    return get(this, "array").objectAt(get(this, "index"));
  }),
});
