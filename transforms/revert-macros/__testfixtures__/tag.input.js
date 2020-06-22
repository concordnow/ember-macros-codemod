import Component from '@ember/component';
import { tag, string } from 'ember-awesome-macros';

export default Component.extend({
  prop1: tag`${'a'}`,
  prop2: tag`foo${'a'}`,
  prop3: tag`foo${'a'}bar`,
  prop4: tag`foo${'a'}bar${'b'}`,
  prop5: tag`foo${'a'}bar${'a'}`,
  prop6: tag`one ${string.toUpper('source')} three`,
  prop7: string.toUpper(tag`one ${'source'} three`),
});
