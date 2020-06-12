import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.substring('string', 'key'),
  prop2: string.substring('string', 1),
  prop3: string.substring(array.join('array'), 1, 2),
});
