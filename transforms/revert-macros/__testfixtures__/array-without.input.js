import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.without('array', 'item'),
  prop2: array.without('array', raw('item')),
});
