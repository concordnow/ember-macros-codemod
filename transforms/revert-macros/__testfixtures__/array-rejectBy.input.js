import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.rejectBy('array', raw('test'), 2),
  prop2: array.rejectBy('array', raw('test')),
});
