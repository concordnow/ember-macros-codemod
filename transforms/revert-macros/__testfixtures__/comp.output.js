import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    let a = get(this, "a");
    // do something
    return a;
  }),
  prop2: computed('a', 'b', 'c', function () {
    let a = get(this, "a");
    let b = get(this, "b");
    let c = get(this, "c");
    // do something
    return a + b + c;
  }),
  prop3: computed('a.[]', 'b.@each.c', function () {
    let a = get(this, "a");
    let b = get(this, "b");
    // do something
    return a + b;
  }),
  prop4: computed('a.b.c', function () {
    let c = get(this, "a.b.c");
    // do something
    return c;
  }),

  prop5: computed('a', function () {
    let foo = get(this, "a");
    // do something
    return foo;
  }),
  prop6: computed('a', 'b', 'c', function () {
    let foo = get(this, "a");
    let bar = get(this, "b");
    let baz = get(this, "c");
    // do something
    return foo + bar + baz;
  }),
  prop7: computed('a.[]', 'b.@each.c', function () {
    let foo = get(this, "a");
    let bar = get(this, "b");
    // do something
    return foo + bar;
  }),
  prop8: computed('a.b.c', function () {
    let foo = get(this, "a.b.c");
    // do something
    return foo;
  }),
});
