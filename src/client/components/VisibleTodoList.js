import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFilter } from '../redux/reducers';
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
  mapStateToProps = state => ({ filter: getFilter(state) }),
  subscribe = connect(mapStateToProps),
  createTodosResource = filter => api.todos.fetchTodos(filter) |> api.createResource,
  propTypes = { filter: PropTypes.string.isRequired };

const
  initialFilter = location.pathname.substr(1) || 'all',
  initialTodosResource = createTodosResource(initialFilter);

function VisibleTodoList({ filter }) {
  const
    [todosResource, setTodosResource] = useState(initialTodosResource),
    handleTodosResource = () => createTodosResource(filter) |> setTodosResource;

  useEffect(handleTodosResource, [filter]);
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
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
