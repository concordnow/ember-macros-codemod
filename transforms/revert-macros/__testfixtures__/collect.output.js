import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return [get(this, "a"), get(this, "b"), get(this, "c")];
  }),
  prop2: computed('a', 'c', function () {
    return [get(this, "a"), 'b', get(this, "c")];
  }),
});
