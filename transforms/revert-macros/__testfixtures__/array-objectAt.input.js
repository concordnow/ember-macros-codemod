import Component from '@ember/component';
import raw from 'ember-macro-helpers/raw';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.objectAt('array', raw(0)),
  prop2: array.objectAt('array', 'index'),
});
