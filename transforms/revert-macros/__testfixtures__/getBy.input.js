import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { getBy } from 'ember-awesome-macros';

export default Component.extend({
  prop1: getBy('obj', 'key'),
  prop2: getBy('obj', raw('key')),
});
