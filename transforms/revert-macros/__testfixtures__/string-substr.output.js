import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', 'key', function () {
    return get(this, "string").substr(get(this, "key"));
  }),
  prop2: computed('string', function () {
    return get(this, "string").substr(1);
  }),
  prop3: computed("array.[]", function () {
    return get(this, "array").join().substr(1, 2);
  }),
});
