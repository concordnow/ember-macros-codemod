import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { eq, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: eq('a', 'b'),
  prop2: eq('a', 'b', 'c'),
  prop3: eq(gt('a', 'b'), raw('c'), 'd'),
  prop4: eq('a', 4),
  prop5: eq('a', -1),
});
