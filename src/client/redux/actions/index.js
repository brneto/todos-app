// Wait the issue: https://github.com/typescript-eslint/typescript-eslint/issues/1436
// To use the new syntax: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#export--as-ns-syntax
import * as effects from './effects';
import * as commands from './commands';
import * as events from './events';
import * as documents from './documents';

export { effects, commands, events, documents };
