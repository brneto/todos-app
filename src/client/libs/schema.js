import { schema } from 'normalizr';

const
  todo = new schema.Entity('todos'),
  // longhand syntax:
  // todoList = new schema.Array(todo);
  todoList = [todo];

export { todo, todoList };
