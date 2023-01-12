import type Generator from './generator.js';

export type GeneratorNewArg<GeneratorType extends Generator = Generator> = new (
  args: string | string[],
  options?: Generator['options'],
) => GeneratorType;

export type GeneratorNewOption<GeneratorType extends Generator = Generator> = new (options?: Generator['options']) => GeneratorType;
