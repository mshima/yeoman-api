import { type GeneratorBaseDefinition } from './generator-definitions.js';

export default interface BaseGenerator<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition> {
  readonly options: Definition['options'];
}
