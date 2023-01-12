import type GeneratorDefinition from './generator-definitions.js';
import type BaseGenerator from './generator.js';

export default interface BaseGenerator6<Definition extends GeneratorDefinition = GeneratorDefinition> extends BaseGenerator {
  readonly options: Definition['options'];
  get features(): Definition['features'];
}
