import React, { Suspense } from 'react';
import styled from 'styled-components';
import * as hooks from '../hooks';
import TodoList from './TodoList';
import ErrorBoundary from './ErrorBoundary';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `,
  OnProgress = styled.p`
    margin-left: 1em;
  `;

function VisibleTodoList() {
  // Custom hook
  const todoList = hooks.todos.useVisibleTodos();

  return (
    <Section>
      <Suspense fallback={<OnProgress>Loading...</OnProgress>}>
        <ErrorBoundary onRetry={todoList.onClick}>
          <TodoList {...todoList} />
        </ErrorBoundary>
      </Suspense>
    </Section>
  );
}

export default VisibleTodoList;
