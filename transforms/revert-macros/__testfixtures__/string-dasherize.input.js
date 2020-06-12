import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.dasherize('string'),
  prop2: string.dasherize(array.join('array')),
});
