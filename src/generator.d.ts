import type BaseEnvironment from './environment.js';
import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type GeneratorEnvironmentOptions, type GeneratorHelpOptions } from './generator-options.js';

export type BaseStorage = {
  defaults(defaultValues: any): void;
};

type BaseGenerator<Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition> = {
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

  destinationRoot(): string;

  // Generator >= v5
  queueTasks(): Promise<void>;

  // Generator >= v5
  get features(): Definition['features'];
};
export default BaseGenerator;

export type GetGeneratorDefinition<T extends BaseGenerator = BaseGenerator> = T extends BaseGenerator<infer Definition>
  ? Definition
  : never;
