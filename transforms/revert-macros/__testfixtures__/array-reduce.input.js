import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.reduce('array', (arr, cur, i) => arr.concat(cur, i), []),
  prop2: array.reduce('array', (acc, cur, i) => acc + cur),
});
