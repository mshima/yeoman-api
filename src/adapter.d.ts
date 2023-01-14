import { type QuestionCollection as InquirerQuestionCollection, type Answers as InquirerAnswers } from 'inquirer';
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
export interface InputOutputAdapter {
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
}
