import { schema } from 'normalizr';

const todo = new schema.Entity('todos');
const todoList = [todo];
// longhand syntax:
// export const todoList = new schema.Array(todo);

export {
  todo,
  todoList
};
