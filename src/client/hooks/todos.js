import { useState } from 'react';
import { addTodo } from '../redux/actions';

function useAddTodo(dispatch) {
  const
    [todo, setTodo] = useState(''),
    handleChange = ({ target }) => setTodo(target.value),
    handleKeyDown = ({ keyCode }) => {
      if(keyCode === 13) { // ENTER_KEY
        dispatch(addTodo(todo.trim()));
        setTodo('');
      }
    };

  return {
    value: todo,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
}

export { useAddTodo };
