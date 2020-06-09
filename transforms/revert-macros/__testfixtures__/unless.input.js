import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { unless, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: unless('a', 'b', 'c'),
  prop2: unless('a', raw('b'), 'c'),
  prop3: unless('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: unless(gt('a', 'd'), raw('b'), 'c'),
});
