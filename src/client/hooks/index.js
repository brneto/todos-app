// Wait the issue: https://github.com/typescript-eslint/typescript-eslint/issues/1436
// To use the new syntax: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#export--as-ns-syntax
import * as todos from './todos';
import * as sse from './sse';
import * as timer from './timer';

export { todos, sse, timer };
