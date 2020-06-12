import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.toUpper('string'),
  prop2: string.toUpper(array.join('array')),
});
