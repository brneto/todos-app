import { schema } from 'normalizr';

export const todo = new schema.Entity('todos');
export const todoList = [todo];
// longhand syntax:
// export const todoList = new schema.Array(todo);
