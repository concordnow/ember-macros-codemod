import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { and, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: and('a', 'b', 'c'),
  prop2: and('a', raw('b'), 'c'),
  prop3: and('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: and(gt('a', 'd'), raw('b'), 'c'),
});
