import Component from '@ember/component';
import { computed } from '@ember/object';
import comp from 'ember-macro-helpers/computed';

export default Component.extend({
  prop1: comp('a', (a) => {
    // do something
    return a;
  }),
});
