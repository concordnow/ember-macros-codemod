import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, notEmpty } from 'ember-awesome-macros';

export default Component.extend({
  prop1: notEmpty('string'),
  prop2: notEmpty(array.join('array', raw(','))),
});
