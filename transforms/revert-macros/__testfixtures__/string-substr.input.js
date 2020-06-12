import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.substr('string', 'key'),
  prop2: string.substr('string', 1),
  prop3: string.substr(array.join('array'), 1, 2),
});
