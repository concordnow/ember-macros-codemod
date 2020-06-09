import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { nor, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: nor('a', 'b', 'c'),
  prop2: nor('a', raw('b'), 'c'),
  prop3: nor('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: nor(gt('a', 'd'), raw('b'), 'c'),
});
