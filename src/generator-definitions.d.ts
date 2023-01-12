import { type GeneratorCustomFeatures } from './generator-features.js';
import { type GeneratorCustomOptions } from './generator-options.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type GeneratorDefinition<
  OptionsDefinition extends GeneratorCustomOptions = GeneratorCustomOptions,
  FeaturesDefinition extends GeneratorCustomFeatures = GeneratorCustomFeatures,
> = {
  options: OptionsDefinition;
  features: FeaturesDefinition;
};
export default GeneratorDefinition;
