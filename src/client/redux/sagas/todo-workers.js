import { featureIsEnabled } from '../../../feature-router';
import * as workersPristine from './todo-workers.pristine';
import * as workersFeatured from './todo-workers.featured';

export const {
  getTodosResource, fetchTodos, addTodo, toggleTodo
} = featureIsEnabled('use-new-React-Suspense') ? workersFeatured : workersPristine;
