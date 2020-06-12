import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.decamelize('string'),
  prop2: string.decamelize(array.join('array')),
});
