import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return parseFloat(get(this, "a"));
  }),
  prop2: computed('a', 'b', 'c', function () {
    return parseFloat(get(this, "a") ? get(this, "b") : get(this, "c"));
  }),
});
