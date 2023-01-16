import { type Transform } from 'node:stream';
import { type Store } from 'mem-fs';

import { type BaseGeneratorConstructor } from './generator-factory.js';
import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type InputOutputAdapter } from './adapter.js';
import { type GeneratorBaseOptions } from './generator-options.js';
import { type WithDefault } from './utils.js';
import { type GetGeneratorDefinition } from './generator.js';
import type BaseGenerator from './generator.js';

export type EnvironmentDefinition<Adapter extends InputOutputAdapter = InputOutputAdapter> = WithDefault<'adapter', Adapter>;

export type EnvironmentConstructor<Definition extends EnvironmentDefinition = EnvironmentDefinition> = new (
  options: BaseEnvironmentOptions,
  adapter: Definition['adapter'],
) => BaseEnvironment<Definition>;

export type BaseEnvironmentOptions = GeneratorBaseOptions & {
  /**
   * The working-directory of the environment.
   */
  cwd?: string | undefined;

  /**
   * A value indicating whether the experimental features should be enabled.
   */
  experimental?: boolean;

  /**
   * Options to pass to every generator instantiated by this Environment.
   */
  sharedOptions?: GeneratorBaseOptions;

  /**
   * `mem-fs` Store.
   */
  sharedFs?: Store;
};

export type GroupedQueue = {
  queueNames: string[];
  add(queueName: string, task: (continueCallback: () => void, stop: (error) => void) => any, options: { once?: string; run?: boolean });
  addSubQueue(queueName: string, before?: string);
  on(eventName: 'start' | 'end', callback: (...args: any[]) => any): boolean;
  on(eventName: 'error', callback: (error: unknown) => any): boolean;
};

type BaseEnvironment<Definition extends EnvironmentDefinition = EnvironmentDefinition> = {
  cwd: string;
  runLoop: GroupedQueue;
  adapter: Definition['adapter'];
  sharedFs: Store;

  emit(eventName: string | symbol, ...args: any[]): boolean;

  applyTransforms(transformStreams: Transform[], stream?: NodeJS.ReadableStream): Promise<void>;
  create<GeneratorType extends BaseGenerator = BaseGenerator>(
    namespaceOrPath: string | BaseGeneratorConstructor<GeneratorType>,
    args: string[],
    options?: GetGeneratorDefinition<GeneratorType>['options'],
  ): Promise<GeneratorType>;
  instantiate<GeneratorType extends BaseGenerator = BaseGenerator>(
    generator: BaseGeneratorConstructor<GeneratorType>,
    args: string[],
    options?: GetGeneratorDefinition<GeneratorType>['options'],
  ): Promise<GeneratorType>;

  /**
   * Converts the specified `filePath` to a namespace.
   *
   * @param filePath The path to convert.
   * @param lookups The path-part to exclude (such as `lib/generators`).
   */
  namespace(filePath: string, lookups?: string[]): string;

  /**
   * Gets the version of this `Environment` object.
   */
  getVersion(): string;

  /**
   * Gets the version of the specified `dependency`.
   *
   * @param dependency The name of the dependency.
   */
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  getVersion(dependency: string): string;

  queueGenerator<GeneratorType extends BaseGenerator = BaseGenerator>(generator: GeneratorType, schedule?: boolean): Promise<GeneratorType>;

  /**
   * Resolves a package name with a specific version.
   *
   * @param packageName The name of the package to resolve.
   * @param packageVersion The version or the version range of the package to resolve.
   */
  resolvePackage(packageName: string, packageVersion?: string): Promise<[string, string]>;

  rootGenerator<GeneratorType extends Generator = Generator>(): GeneratorType;

  runGenerator(generator: Generator): Promise<void>;

  /**
   * Registers a specific `generator` to this environment.
   * This generator is stored under the provided `namespace` or, if not specified, a default namespace format.
   *
   * @param filePath The filepath to the generator or an npm package name.
   * @param namespace The namespace under which the generator should be registered.
   * @param packagePath The path to the npm package of the generator.
   */
  register(filePath: string, namespace?: string, packagePath?: string): Promise<void>;

  /**
   * Registers a stubbed generator to this environment.
   *
   * @param generator The generator constructor.
   * @param namespace The namespace under which the generator should be registered.
   * @param resolved The file-path to the generator.
   * @param packagePath The path to the npm package of the generator.
   */
  registerStub(generator: BaseGeneratorConstructor, namespace: string, resolved?: string, packagePath?: string): void;
};
export default BaseEnvironment;

export type createEnv<Environment extends BaseEnvironment = BaseEnvironment> = (
  options?: ConstructorParameters<EnvironmentConstructor>[0],
  adapter?: Environment['adapter'],
) => Promise<Environment>;
