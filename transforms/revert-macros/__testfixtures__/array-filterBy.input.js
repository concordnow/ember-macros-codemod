import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.filterBy('array', raw('test'), 2),
  prop2: array.filterBy('array', raw('test')),
  prop3: array.filterBy('array', raw('test'), null),
  prop4: array.filterBy('array', raw('test'), true),
});
