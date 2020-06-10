import Component from '@ember/component';
import { parseFloat, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: parseFloat('a'),
  prop2: parseFloat(conditional('a', 'b', 'c')),
});
