import { computed, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  prop1: computed('a', function () {
    return `${get(this, "a")}`;
  }),
  prop2: computed('a', function () {
    return `foo${get(this, "a")}`;
  }),
  prop3: computed('a', function () {
    return `foo${get(this, "a")}bar`;
  }),
  prop4: computed('a', 'b', function () {
    return `foo${get(this, "a")}bar${get(this, "b")}`;
  }),
  prop5: computed('a', function () {
    return `foo${get(this, "a")}bar${get(this, "a")}`;
  }),
  prop6: computed('source', function () {
    return `one ${get(this, "source").toUpperCase()} three`;
  }),
  prop7: computed('source', function () {
    return `one ${get(this, "source")} three`.toUpperCase();
  }),
});
