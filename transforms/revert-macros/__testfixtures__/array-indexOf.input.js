import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.indexOf('array', raw('item')),
  prop2: array.indexOf('array', 'item'),
});
