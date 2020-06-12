import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', 'key', function () {
    return get(this, "string").split(get(this, "key"));
  }),
  prop2: computed("array.[]", function () {
    return get(this, "array").join().split(',');
  }),
});
