import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('obj', 'key', function () {
    return get(get(this, "obj"), get(this, "key"));
  }),
  prop2: computed('obj', function () {
    return get(get(this, "obj"), 'key');
  }),
});
