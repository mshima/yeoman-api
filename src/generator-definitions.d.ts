import { type GeneratorBaseFeatures, type GeneratorCustomFeatures } from './generator-features.js';
import {
  type GeneratorEnvironmentOptions,
  type GeneratorHelpOptions,
  type GeneratorBaseOptions,
  type GeneratorCustomOptions,
} from './generator-options.js';

export type GeneratorBaseDefinition<OptionsDefinition = GeneratorCustomOptions, FeaturesDefinition = GeneratorCustomFeatures> = {
  options: GeneratorBaseOptions & OptionsDefinition;
  features: GeneratorBaseFeatures & FeaturesDefinition;
};
