import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.sort('array'),
  prop2: array.sort('array', (a, b) => a.key < b.key),
});
