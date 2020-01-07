import React from 'react';
import styled from 'styled-components';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';
import TickerTape from './TickerTape';

// TODO: First replace by object notation
// TODO: https://www.styled-components.com/docs/advanced#style-objects
// TODO: Then experiment replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  TodoApp = styled.div`
    position: relative;
    margin: 130px 0 40px 0;
    background: #fff;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, .2),
      0 25px 50px 0 rgba(0, 0, 0, .1);
  `,
  App = () => (
    <TodoApp>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
      <TickerTape url="api/sse" />
    </TodoApp>
  );

export default App;
