import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.htmlSafe('string'),
  prop2: string.htmlSafe(array.join('array', raw(','))),
});
