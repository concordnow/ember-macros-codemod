import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { nand, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: nand('a', 'b', 'c'),
  prop2: nand('a', raw('b'), 'c'),
  prop3: nand('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: nand(gt('a', 'd'), raw('b'), 'c'),
});
