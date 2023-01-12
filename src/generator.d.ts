import type GeneratorDefinition from './generator-definitions.js';

export default interface BaseGenerator<Definition extends GeneratorDefinition = GeneratorDefinition> {
  readonly options: Definition['options'];
}
