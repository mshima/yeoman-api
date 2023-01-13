import { type GeneratorBaseDefinition } from './generator-definitions.js';
import type BaseGenerator from './generator.js';

export default interface BaseGenerator6<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition> extends BaseGenerator {
  readonly options: Definition['options'];
  get features(): Definition['features'];
}
