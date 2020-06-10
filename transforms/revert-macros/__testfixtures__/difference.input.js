import Component from '@ember/component';
import { difference, substract, or } from 'ember-awesome-macros';

export default Component.extend({
  prop1: difference('a', 'b'),
  prop2: substract('a', 'b'),
  prop3: difference(or('a', 'b'), 'c'),
  prop4: difference('a', 'b', 'c'),
});
