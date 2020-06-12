import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.split('string', 'key'),
  prop2: string.split(array.join('array'), raw(',')),
});
