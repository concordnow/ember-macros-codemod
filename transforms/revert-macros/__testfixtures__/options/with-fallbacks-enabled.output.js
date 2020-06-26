import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed("array.@each.test", function () {
    return (get(this, "array") || []).filterBy('test', 2);
  }),
  prop2: computed('string', 'key', function () {
    return (get(this, "string") || "").split(get(this, "key"));
  }),
  prop3: computed('string', function () {
    return (get(this, "string") || "").toLowerCase();
  }),
});
