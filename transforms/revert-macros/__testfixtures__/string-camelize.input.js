import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.camelize('string'),
  prop2: string.camelize(array.join('array')),
});
