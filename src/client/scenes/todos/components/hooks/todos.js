import { useState } from 'react';
import { effects } from '../../../../redux/actions';

export function useAddTodo(dispatch) {
  const
    [todo, setTodo] = useState(''),
    handleChange = ({ target }) => setTodo(target.value),
    handleKeyDown = ({ keyCode }) => {
      if(keyCode === 13) { // ENTER_KEY
        dispatch(effects.addTodo(todo.trim()));
        setTodo('');
      }
    };

  return {
    value: todo,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
}

