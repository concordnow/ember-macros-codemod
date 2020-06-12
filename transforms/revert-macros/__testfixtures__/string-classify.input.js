import Component from '@ember/component';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.classify('string'),
  prop2: string.classify(array.join('array')),
});
