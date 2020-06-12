import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return get(this, "string").length;
  }),
});
