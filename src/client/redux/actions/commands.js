import { createActions } from 'redux-actions';
import { metaFilterListCreator } from './utils';

// Pure Command actions
// Naming Convention: <imperative verb><subject>
export const { addTodoToList, removeTodoFromList } =
  createActions({
    ADD_TODO_TO_LIST: metaFilterListCreator,
    REMOVE_TODO_FROM_LIST: metaFilterListCreator,
  });
