import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { gt, not } from 'ember-awesome-macros';

export default Component.extend({
  prop1: not('a'),
  prop2: not(gt('a', 'b')),
});
