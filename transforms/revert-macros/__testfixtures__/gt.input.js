import Component from '@ember/component';
import { gt, add } from 'ember-awesome-macros';

export default Component.extend({
  prop1: gt('a', 'b'),
  prop2: gt(add('a', 'b'), 'c'),
});
