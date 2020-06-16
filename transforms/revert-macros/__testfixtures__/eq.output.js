import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', function () {
    return get(this, "a") === get(this, "b");
  }),
  prop2: computed('a', 'b', 'c', function () {
    return get(this, "a") === get(this, "b") && get(this, "a") === get(this, "c");
  }),
  prop3: computed('a', 'b', 'd', function () {
    return get(this, "a") > get(this, "b") === 'c' && get(this, "a") > get(this, "b") === get(this, "d");
  }),
  prop4: computed('a', function () {
    return get(this, "a") === 4;
  }),
  prop5: computed('a', function () {
    return get(this, "a") === -1;
  }),
});
