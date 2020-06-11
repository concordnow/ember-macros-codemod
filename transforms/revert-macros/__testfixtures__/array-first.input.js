import Component from '@ember/component';
import { array } from 'ember-awesome-macros';

export default Component.extend({
  prop1: array.first('array'),
});
