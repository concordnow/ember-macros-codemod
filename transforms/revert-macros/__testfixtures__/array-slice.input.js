import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.slice('array', 1, 2),
  prop2: array.slice('array', 1),
  prop3: array.slice('array', 'index'),
});
