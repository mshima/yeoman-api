import type GeneratorDefinition from './generator-definitions.js';
import type BaseGenerator6 from './generator6.js';

type AnyGenerator<Definition extends GeneratorDefinition = GeneratorDefinition> = BaseGenerator6<Definition>;
export default AnyGenerator;
