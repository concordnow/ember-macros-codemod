import Component from '@ember/component';
import { gte, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: gte('a', 'b'),
  prop2: gte(add('a', 'b'), 'c'),
});
