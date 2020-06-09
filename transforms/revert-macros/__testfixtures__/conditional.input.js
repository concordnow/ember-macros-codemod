import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { conditional, gt } from 'ember-awesome-macros';

export default Component.extend({
  prop1: conditional('a', 'b', 'c'),
  prop2: conditional('a', raw('b'), 'c'),
  prop3: conditional('a.b.c', 'd.e.f', 'g.h.i'),
  prop4: conditional(gt('a', 'd'), raw('b'), 'c'),
});
