import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type BaseGeneratorConstructorFeatures } from './generator-factory.js';
import { type BaseGeneratorWithFeatures } from './generator.js';

export default interface BaseGenerator6<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition>
  extends BaseGeneratorWithFeatures<Definition> {
  queueTasks(): Promise<void>;
}
