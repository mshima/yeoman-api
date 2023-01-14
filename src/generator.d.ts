import type BaseEnvironment from './environment.js';
import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type GeneratorEnvironmentOptions, type GeneratorHelpOptions } from './generator-options.js';

export interface BaseStorage {
  defaults(defaultValues: any): void;
}

export default interface BaseGenerator<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition> {
  readonly options: Definition['options'];

  readonly env: BaseEnvironment;

  config: BaseStorage;

  arguments: any[];

  _options: any[];

  _arguments: any[];

  _arg: any[];

  _environmentOptions?: GeneratorEnvironmentOptions;

  emit(eventName: string | symbol, ...args: any[]): boolean;

  _postConstruct?(): Promise<void>;
}

export interface BaseGeneratorWithFeatures<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition>
  extends BaseGenerator<Definition> {
  get features(): Definition['features'];

  destinationRoot(): string;
}

export type GetGeneratorDefinition<T extends BaseGenerator = BaseGenerator> = T extends BaseGenerator<infer Definition>
  ? Definition
  : never;
