import Component from '@ember/component';
import { multiply, product, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: multiply('a', 'b'),
  prop2: product('a', 'b'),
  prop3: multiply(or('a', 'b'), 'c'),
});
