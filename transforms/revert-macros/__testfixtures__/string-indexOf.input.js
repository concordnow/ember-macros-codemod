import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: string.indexOf('string', raw('item')),
  prop2: string.indexOf('string', 'item'),
});
