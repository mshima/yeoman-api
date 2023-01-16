import { type QuestionCollection as InquirerQuestionCollection, type Answers as InquirerAnswers } from 'inquirer';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Change } from 'diff';
import { type Logger } from './logger.js';

export type Answers = InquirerAnswers;

/**
 * Represents a set of questions.
 */
export type QuestionCollection<T extends Answers> = InquirerQuestionCollection<T>;

/**
 * Abstraction layer that defines the I/O interactions.
 *
 * It provides a CLI interaction
 */
export type InputOutputAdapter = {
  /**
   * A component for logging messages.
   */
  log?: Logger;

  /**
   * Prompts the user for one or more questions.
   *
   * @param questions The questions to prompt.
   * @param initialAnswers Initial answers.
   */
  prompt?<TAnswers extends Answers>(questions: QuestionCollection<TAnswers>, initialAnswers?: TAnswers): Promise<TAnswers>;

  /**
   * Close underline inputs.
   */
  close?(): void;

  /**
   * Shows a color-based diff of two strings.
   *
   * @param actual The actual text.
   * @param expected The expected text.
   * @param changes The changes returned by `diff`.
   * @returns The formatted message.
   */
  diff?(actual: string, expected: string, changes: Change[]): string;
};
