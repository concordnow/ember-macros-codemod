import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.toLower('string'),
  prop2: string.toLower(array.join('array')),
});
