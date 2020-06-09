import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', 'b', 'c', function () {
    return get(this, "a") && get(this, "b") && get(this, "c");
  }),
  prop2: computed('a', 'c', function () {
    return get(this, "a") && 'b' && get(this, "c");
  }),
  prop3: computed('a.b.c', 'd.e.f', 'g.h.i', function () {
    return get(this, "a.b.c") && get(this, "d.e.f") && get(this, "g.h.i");
  }),
  prop4: computed('a', 'd', 'c', function () {
    return get(this, "a") > get(this, "d") && 'b' && get(this, "c");
  }),
});
