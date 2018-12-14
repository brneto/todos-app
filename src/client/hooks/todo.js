import { useState } from 'react';
import { addTodo } from '../redux/actions';

export function useAddTodo(dispatch) {
  const [todo, setTodo] = useState('');
  const handleChange = ({ target }) => setTodo(target.value);
  const handleKeyDown = ({ keyCode }) => {
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
