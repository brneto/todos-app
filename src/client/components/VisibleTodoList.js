import React, { useState, Suspense } from 'react';
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
  createTodosResource = filter => api.createResource(api.todos.fetchTodos(filter)),
  propTypes = {
    filter: PropTypes.string.isRequired,
    toggleTodo: PropTypes.func,
  };

const
  initialFilter = location.pathname.substr(1),
  initialTodosResource = createTodosResource(initialFilter);

function VisibleTodoList({ filter, toggleTodo }) {
  const
    [todosResource, setTodosResource] = useState(initialTodosResource),
    handleRetryResource = () => setTodosResource(createTodosResource(filter));

  return (
    <Section>
      <Suspense fallback={<OnProgress>Loading...</OnProgress>}>
        <ErrorBoundary onRetry={handleRetryResource}>
          <TodoList resource={todosResource} onClick={toggleTodo} />
        </ErrorBoundary>
      </Suspense>
    </Section>
  );
}
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
