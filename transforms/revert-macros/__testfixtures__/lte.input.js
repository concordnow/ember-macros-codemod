import Component from '@ember/component';
import { lte, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: lte('a', 'b'),
  prop2: lte(add('a', 'b'), 'c'),
});
