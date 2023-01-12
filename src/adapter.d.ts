// eslint-disable-next-line import/no-extraneous-dependencies
import { type Change } from 'diff';
import { type QuestionCollection as InquirerQuestionCollection, type PromptModule, type Answers as InquirerAnswers } from 'inquirer';
import { type Logger } from './logger.js';

export type Answers = InquirerAnswers;

/**
 * Represents a set of questions.
 */
export type QuestionCollection<T extends Answers> = InquirerQuestionCollection<T>;

/**
 * `TerminalAdapter` is the default implementation of `Adapter`, an abstraction
 * layer that defines the I/O interactions.
 *
 * It provides a CLI interaction
 */
export interface TerminalAdapter {
  /**
   * An inquirer prompt module.
   */
  promptModule: PromptModule;

  /**
   * A console-object for logging messages.
   */
  console: Console;

  /**
   * A component for logging messages.
   */
  log: Logger;

  /**
   * Prompts the user for one or more questions.
   *
   * @param questions The questions to prompt.
   * @param initialAnswers Initial answers.
   */
  prompt<TAnswers extends Answers>(questions: QuestionCollection<TAnswers>, initialAnswers?: TAnswers): Promise<TAnswers>;

  /**
   * Shows a color-based diff of two strings.
   *
   * @param actual The actual text.
   * @param expected The expected text.
   * @param changes The changes returned by `diff`.
   * @returns The formatted message.
   */
  diff(actual: string, expected: string, changes: Change[]): string;
}
