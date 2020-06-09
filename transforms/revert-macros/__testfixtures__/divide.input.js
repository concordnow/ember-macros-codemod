import Component from '@ember/component';
import { divide, quotient, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: divide('a', 'b'),
  prop2: quotient('a', 'b'),
  prop3: divide(or('a', 'b'), 'c'),
});
