import { type GeneratorBaseDefinition } from './generator-definitions.js';
import type BaseGenerator6 from './generator6.js';

type AnyGenerator<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition> = BaseGenerator6<Definition>;
export default AnyGenerator;
