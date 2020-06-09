import Component from '@ember/component';
import { add, sum, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: add('a', 'b'),
  prop2: sum('a', 'b'),
  prop3: add(or('a', 'b'), 'c'),
});
