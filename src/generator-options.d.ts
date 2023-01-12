/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type Environment from './environment.js';

export type GeneratorCustomOptions = Record<string, unknown>;

export type GeneratorBaseOptions = unknown;

type GeneratorNamespace = {
  namespace: string;
};

export type GeneratorEnvironmentOptions = GeneratorNamespace & {
  help?: boolean;

  /** Environment being to run */
  env: Environment;

  /** The path to the current generator */
  resolved: string;
};

export type GeneratorHelpOptions = GeneratorNamespace & {
  help: true;
};
