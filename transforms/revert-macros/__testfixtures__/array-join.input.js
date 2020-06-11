import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.join('array', raw('sep')),
  prop2: array.join('array', 'sep'),
});
