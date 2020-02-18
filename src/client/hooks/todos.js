import { useState } from 'react';
import { effects } from '../redux/actions';
import { getFilterPath } from '../redux/reducers';
import * as api from '../api';

const
  createTodosResource = filter => api.todos.fetchTodos(filter) |> api.createResource,
  initialFilter = getFilterPath(),
  initialResource = createTodosResource(initialFilter);

function useVisibleTodos() {
  const
    [prevFilter, setPrevFilter] = useState(initialFilter),
    [todosResource, setTodosResource] = useState(initialResource);

  const
    filter = getFilterPath(),
    handleTodosResource = () => createTodosResource(filter) |> setTodosResource;

  if (filter !== prevFilter) {
    setPrevFilter(filter);
    handleTodosResource();
  }

  return {
    resource: todosResource,
    onClick: handleTodosResource,
  };
}

function useAddTodo(dispatch) {
  const
    [todo, setTodo] = useState(''),
    handleChange = ({ target }) => setTodo(target.value),
    handleKeyDown = ({ keyCode }) => {
      if(keyCode === 13) { // ENTER_KEY
        todo.trim() |> effects.addTodo |> dispatch;
        setTodo('');
      }
    };

  return {
    value: todo,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
}

export { useVisibleTodos, useAddTodo };
