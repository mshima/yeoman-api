import type Environment from './environment.js';

export type GeneratorCustomOptions = Record<string, unknown>;

export default interface BaseGeneratorOptions {
  /** Environment being to run */
  env: Environment;

  /** The path to the current generator */
  resolved: string;

  namespace: string;
}
