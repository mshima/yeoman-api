/**
 * Provides default color-categories.
 */
export type DefaultLoggerCategories = 'skip' | 'force' | 'create' | 'invoke' | 'conflict' | 'identical' | 'info';

/**
 * Provides the functionality to log messages.
 */
export type Logger<TCategories extends string | number | symbol = DefaultLoggerCategories> = {
  /**
   * Logs a message of the specified category.
   */
  [P in TCategories]: (...args: Parameters<typeof format>) => Logger<TCategories>;
} & {
  /**
   * Writes a log-message.
   *
   * @param format
   * The format of the log-messages.
   * See <https://github.com/mikeal/logref> for more info.
   *
   * @param params
   * The parameters to replace variables with.
   */
  (format?: string, parameters?: Record<string, any>): Logger<TCategories>;

  /**
   * Writes a log-message.
   */
  (...args: Parameters<Console['error']>): Logger<TCategories>;

  /**
   * Writes a log-message.
   */
  write(...args: Parameters<typeof format>): Logger<TCategories>;

  /**
   * Writes a log-message with an appended newline character.
   */
  writeln(...args: Parameters<typeof format>): Logger<TCategories>;

  /**
   * Writes a success status with a check mark `✔`.
   */
  ok(...args: Parameters<typeof format>): Logger<TCategories>;

  /**
   * Writes an error-message with a prepended cross mark.
   */
  error(...args: Parameters<typeof format>): Logger<TCategories>;
};
