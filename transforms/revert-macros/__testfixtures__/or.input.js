import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { or, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: or('a', 'b', 'c'),
  prop2: or('a', raw('b'), 'c'),
  prop3: or('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: or(gt('a', 'd'), raw('b'), 'c'),
});
