import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { neq, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: neq('a', 'b'),
  prop2: neq('a', 'b', 'c'),
  prop3: neq(gt('a', 'b'), raw('c'), 'd'),
});
