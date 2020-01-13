import { featureIsEnabled } from '../../../feature-router';
import * as workersPristine from './todo-workers.pristine';
import * as workersFeatured from './todo-workers.featured';

export const
  { fetchTodos, addTodo, toggleTodo } = workersPristine,
  getTodosResource = featureIsEnabled('use-new-React-Suspense') ? workersFeatured : undefined;
