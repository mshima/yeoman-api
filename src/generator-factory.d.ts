import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type GeneratorConstructorBaseOptions } from './generator-options.js';
import type BaseGenerator from './generator.js';
import { type GetGeneratorDefinition, type BaseGeneratorWithFeatures } from './generator.js';

export type GeneratorConstructorOptions<GeneratorDefinition extends GeneratorBaseDefinition = GeneratorBaseDefinition> =
  GeneratorConstructorBaseOptions & GeneratorDefinition['options'];

export type BaseGeneratorConstructor<GeneratorType extends BaseGenerator = BaseGenerator> = new (
  args: string[],
  options: GeneratorConstructorOptions<GetGeneratorDefinition<GeneratorType>['options']>,
  features: GetGeneratorDefinition<GeneratorType>['features'],
) => GeneratorType;

export type BaseGeneratorBuilder<GeneratorType extends BaseGenerator = BaseGenerator> = (
  ...args: ConstructorParameters<BaseGeneratorConstructor<GeneratorType>>
) => Promise<GeneratorType>;

export type BaseGeneratorFactory<GeneratorType extends BaseGenerator = BaseGenerator> =
  | BaseGeneratorConstructor<GeneratorType>
  | BaseGeneratorBuilder<GeneratorType>;

export type BaseGeneratorFactoryType<T extends BaseGeneratorFactory> = T extends new (...args: any) => any
  ? InstanceType<T>
  : Awaited<ReturnType<T>>;
