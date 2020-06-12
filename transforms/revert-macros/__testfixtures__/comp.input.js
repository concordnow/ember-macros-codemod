import Component from '@ember/component';
import comp from 'ember-macro-helpers/computed';

export default Component.extend({
  prop1: comp('a', (a) => {
    // do something
    return a;
  }),
  prop2: comp('a', 'b', 'c', (a, b, c) => {
    // do something
    return a + b + c;
  }),
  prop3: comp('a.[]', 'b.@each.c', (a, b) => {
    // do something
    return a + b;
  }),
  prop4: comp('a.b.c', (c) => {
    // do something
    return c;
  }),

  prop5: comp('a', (foo) => {
    // do something
    return foo;
  }),
  prop6: comp('a', 'b', 'c', (foo, bar, baz) => {
    // do something
    return foo + bar + baz;
  }),
  prop7: comp('a.[]', 'b.@each.c', (foo, bar) => {
    // do something
    return foo + bar;
  }),
  prop8: comp('a.b.c', (foo) => {
    // do something
    return foo;
  }),

  prop9: comp('a', (foo) => foo),
});
