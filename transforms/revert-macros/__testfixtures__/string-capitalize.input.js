import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.capitalize('string'),
  prop2: string.capitalize(array.join('array')),
});
