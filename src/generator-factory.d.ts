import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type GeneratorConstructorBaseOptions } from './generator-options.js';
import type BaseGenerator from './generator.js';
import { type GetGeneratorDefinition, type BaseGeneratorWithFeatures } from './generator.js';

export type GeneratorConstructorOptions<GeneratorDefinition extends GeneratorBaseDefinition = GeneratorBaseDefinition> =
  GeneratorConstructorBaseOptions & GeneratorDefinition['options'];

export type BaseGeneratorConstructor<GeneratorType extends BaseGenerator = BaseGeneratorWithFeatures> =
  GeneratorType extends BaseGeneratorWithFeatures
    ? BaseGeneratorConstructorFeatures<GeneratorType>
    : BaseGeneratorConstructorArg<GeneratorType>;

export type BaseGeneratorConstructorArg<GeneratorType extends BaseGenerator = BaseGenerator> = new (
  args: string[],
  options: GeneratorConstructorOptions<GetGeneratorDefinition<GeneratorType>['options']>,
) => GeneratorType;

export type BaseGeneratorConstructorFeatures<GeneratorType extends BaseGeneratorWithFeatures = BaseGeneratorWithFeatures> = new (
  args: string[],
  options: GeneratorConstructorOptions<GetGeneratorDefinition<GeneratorType>['options']>,
  features: GetGeneratorDefinition<GeneratorType>['features'],
) => GeneratorType;
