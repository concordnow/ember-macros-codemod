import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array, isEmpty } from 'ember-awesome-macros';

export default Component.extend({
  prop1: isEmpty('string'),
  prop2: isEmpty(array.join('array', raw(','))),
});
