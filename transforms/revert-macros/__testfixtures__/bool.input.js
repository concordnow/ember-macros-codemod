import Component from '@ember/component';
import { bool, conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: bool('a'),
  prop2: bool(conditional('a', 'b', 'c')),
});
