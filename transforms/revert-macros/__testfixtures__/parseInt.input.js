import Component from '@ember/component';
import { parseInt, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: parseInt('a'),
  prop2: parseInt(conditional('a', 'b', 'c')),
  prop3: parseInt(conditional('a', 'b', 'c'), 1),
});
