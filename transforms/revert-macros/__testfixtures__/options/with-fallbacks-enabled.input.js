import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.filterBy('array', raw('test'), 2),
  prop2: string.split('string', 'key'),
  prop3: string.toLower('string'),
});
