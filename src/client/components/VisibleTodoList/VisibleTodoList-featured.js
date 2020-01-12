import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import ErrorBoundary from './ErrorBoundary';
import FetchError from './FetchError';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `;

const
  VisibleTodoList = () => (
    // Since this component render will always be called whenever the filter props changes,
    // the useEffect function is no necessary anymore.
    // https://github.com/facebook/react/issues/14920
    // useEffect(
    //   () => void fetchTodos(),
    //   [fetchTodos, filter]
    // );
    <Section>
      <ErrorBoundary fallbackComponent={FetchError}>
        <TodoList />
      </ErrorBoundary>
    </Section>
  );

export default VisibleTodoList;
