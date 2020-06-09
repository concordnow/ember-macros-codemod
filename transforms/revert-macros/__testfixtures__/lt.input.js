import Component from '@ember/component';
import { lt, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: lt('a', 'b'),
  prop2: lt(add('a', 'b'), 'c'),
});
