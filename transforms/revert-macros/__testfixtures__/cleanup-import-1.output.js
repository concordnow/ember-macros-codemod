import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  prop1: computed('a', function () {
    let a = get(this, "a");
    // do something
    return a;
  }),
});
