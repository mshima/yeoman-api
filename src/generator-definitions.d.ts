import { type GeneratorBaseFeatures, type GeneratorCustomFeatures } from './generator-features.js';
import {
  type GeneratorEnvironmentOptions,
  type GeneratorHelpOptions,
  type GeneratorBaseOptions,
  type GeneratorCustomOptions,
} from './generator-options.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type GeneratorBaseDefinition<OptionsDefinition = GeneratorCustomOptions, FeaturesDefinition = GeneratorCustomFeatures> = {
  options: GeneratorBaseOptions & OptionsDefinition;
  features: GeneratorBaseFeatures & FeaturesDefinition;
};
