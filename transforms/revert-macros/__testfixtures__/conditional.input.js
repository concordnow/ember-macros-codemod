import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { conditional } from 'ember-awesome-macros';

export default Component.extend({
  prop1: conditional('a', 'b', 'c'),
  prop2: conditional('a', raw('b'), 'c'),
  prop3: conditional('a.b.c', 'd.e.f', 'g.h.i'),
});
