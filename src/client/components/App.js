import React from 'react';
import styled from 'styled-components';
import AddTodo from './AddTodo';
import AddTodoForm from './AddTodoForm';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const TodoApp = styled.div`
  position: relative;
  margin: 130px 0 40px 0;
  background: #fff;
  box-shadow:
    0 2px 4px 0 rgba(0, 0, 0, .2),
    0 25px 50px 0 rgba(0, 0, 0, .1);
`;

const App = () => (
  <TodoApp>
    <AddTodo render={AddTodoForm} />
    <VisibleTodoList />
    <Footer />
  </TodoApp>
);

export default App;
