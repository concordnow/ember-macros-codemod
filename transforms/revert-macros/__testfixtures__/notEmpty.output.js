import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('string', function () {
    return !isEmpty(get(this, "string"));
  }),
  prop2: computed("array.[]", function () {
    return !isEmpty(get(this, "array").join(','));
  }),
});
