import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import ErrorBoundary from './ErrorBoundary';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `;

const
  VisibleTodoList = () => (
    <Section>
      <ErrorBoundary>
        <TodoList />
      </ErrorBoundary>
    </Section>
  );

export default VisibleTodoList;
