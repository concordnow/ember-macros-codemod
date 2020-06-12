import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { collect } from 'ember-awesome-macros';

export default Component.extend({
  prop1: collect('a', 'b', 'c'),
  prop2: collect('a', raw('b'), 'c'),
});
