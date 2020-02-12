import React, { useState, Suspense } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import styled from 'styled-components';
// import { getFilter } from '../redux/reducers';
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
  getFilter = () => location.pathname.substr(1) || 'all',
  createTodosResource = filter => api.todos.fetchTodos(filter) |> api.createResource,
  initialFilter = getFilter(),
  initialResource = createTodosResource(initialFilter);


function VisibleTodoList() {
  const
    [prevFilter, setPrevFilter] = useState(initialFilter),
    [todosResource, setTodosResource] = useState(initialResource),
    handleTodosResource = () => getFilter() |> createTodosResource |> setTodosResource;

    if (getFilter() !== prevFilter) {
      setPrevFilter(getFilter());
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
