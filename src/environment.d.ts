import { type Transform } from 'node:stream';
import { type Store } from 'mem-fs';

import { type GeneratorNewArg } from './generator-factory.js';
import type GeneratorBaseOptions from './generator-options.js';
import type Generator from './generator.js';

export interface GroupedQueue {
  queueNames: string[];
  add(queueName: string, task: (continueCallback: () => void) => void, options: { once?: string; run?: boolean });
  addSubQueue(queueName: string, before?: string);
}

export default interface BaseEnvironment {
  cwd: string;
  runLoop: GroupedQueue;
  adapter: any;
  sharedFs: Store;

  emit(eventName: string | symbol, ...args: any[]): boolean;

  applyTransforms(transformStreams: Transform[], stream?: NodeJS.ReadableStream): Promise<void>;
  create<GeneratorType extends Generator = Generator>(
    namespaceOrPath: string | GeneratorNewArg<GeneratorType>,
    args: string[],
    options?: GeneratorBaseOptions & GeneratorType['options'],
  ): Promise<GeneratorType>;
  instantiate<GeneratorType extends Generator = Generator>(
    generator: GeneratorNewArg<GeneratorType>,
    args: string[],
    options?: GeneratorBaseOptions & GeneratorType['options'],
  ): Promise<GeneratorType>;
  getVersion(): string;
  queueGenerator<GeneratorType extends Generator = Generator>(generator: GeneratorType, schedule?: boolean): GeneratorType;
  runGenerator(generator: Generator): Promise<void>;
}
