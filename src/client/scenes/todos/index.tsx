import React from 'react';
import styled from '@emotion/styled';
import { AddTodo, VisibleTodoList, Footer, TickerTape } from './components';

const
  Scene = styled.div`
    position: relative;
    margin: 130px 0 40px 0;
    background: #fff;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, .2),
      0 25px 50px 0 rgba(0, 0, 0, .1);
  `;

const
  TodoPage = () => (
    <Scene>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
      <TickerTape url="api/sse" />
    </Scene>
  );

export default TodoPage;
