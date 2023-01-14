import { type Transform } from 'node:stream';
import { type Store } from 'mem-fs';

import { type BaseGeneratorConstructor } from './generator-factory.js';
import type Generator from './generator.js';
import { type GeneratorBaseDefinition } from './generator-definitions.js';
import { type InputOutputAdapter } from './adapter.js';

export interface GroupedQueue {
  queueNames: string[];
  add(queueName: string, task: (continueCallback: () => void, stop: (error) => void) => any, options: { once?: string; run?: boolean });
  addSubQueue(queueName: string, before?: string);
  on(eventName: 'start' | 'end', callback: (...args: any[]) => any): boolean;
  on(eventName: 'error', callback: (error: unknown) => any): boolean;
}

export default interface BaseEnvironment {
  cwd: string;
  runLoop: GroupedQueue;
  adapter: InputOutputAdapter;
  sharedFs: Store;

  emit(eventName: string | symbol, ...args: any[]): boolean;

  applyTransforms(transformStreams: Transform[], stream?: NodeJS.ReadableStream): Promise<void>;
  create<
    GeneratorType extends Generator<Definition> = Generator<Definition>,
    Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition,
  >(
    namespaceOrPath: string | BaseGeneratorConstructor<GeneratorType>,
    args: string[],
    options?: Definition['options'],
  ): Promise<GeneratorType>;
  instantiate<
    GeneratorType extends Generator<Definition> = Generator<Definition>,
    Definition extends GeneratorBaseDefinition = GeneratorBaseDefinition,
  >(
    generator: BaseGeneratorConstructor<GeneratorType>,
    args: string[],
    options?: Definition['options'],
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

  queueGenerator<GeneratorType extends Generator = Generator>(generator: GeneratorType, schedule?: boolean): Promise<GeneratorType>;

  /**
   * Resolves a package name with a specific version.
   *
   * @param packageName The name of the package to resolve.
   * @param packageVersion The version or the version range of the package to resolve.
   */
  resolvePackage(packageName: string, packageVersion?: string): Promise<[string, string]>;

  rootGenerator<GeneratorType extends Generator = Generator>(): GeneratorType;

  runGenerator(generator: Generator): Promise<void>;
}
