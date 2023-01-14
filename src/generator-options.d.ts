/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type Environment from './environment.js';

export type GeneratorCustomOptions = Record<string, unknown>;

export type GeneratorBaseOptions = {
  skipInstall?: boolean;
};

type GeneratorNamespace = {
  namespace: string;
};

type GeneratorEnvironmentOptions = {
  help?: boolean;

  /** Environment being to run */
  env: Environment;

  /** The path to the current generator */
  resolved: string;
};

type GeneratorHelpOptions = {
  help: true;
};

export type GeneratorConstructorBaseOptions = GeneratorNamespace &
  (Partial<GeneratorEnvironmentOptions> | (GeneratorEnvironmentOptions & GeneratorHelpOptions));
