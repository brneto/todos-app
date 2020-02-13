import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import * as api from '../api';
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

const
  createTodosResource = filter => api.todos.fetchTodos(filter) |> api.createResource,
  initialFilter = api.getFilterPath(),
  initialResource = createTodosResource(initialFilter);


function VisibleTodoList() {
  const
    filter = api.getFilterPath(),
    [prevFilter, setPrevFilter] = useState(initialFilter),
    [todosResource, setTodosResource] = useState(initialResource),
    handleTodosResource = () => createTodosResource(filter) |> setTodosResource;

    if (filter !== prevFilter) {
      setPrevFilter(filter);
      handleTodosResource();
    }

  return (
    <Section>
      <Suspense fallback={<OnProgress>Loading...</OnProgress>}>
        <ErrorBoundary onRetry={handleTodosResource}>
          <TodoList resource={todosResource} onClick={handleTodosResource} />
        </ErrorBoundary>
      </Suspense>
    </Section>
  );
}

export default VisibleTodoList;
