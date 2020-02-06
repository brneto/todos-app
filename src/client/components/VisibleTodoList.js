import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFilter } from '../redux/reducers';
import * as api from '../api';
import createResource from '../resource';
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
  propTypes = {
    filter: PropTypes.string.isRequired,
    retryResource: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({ filter, retryResource, toggleTodo }) {
  const todosResource = createResource(api.todos.fetchTodos(filter));
  return (
    <Section>
      <Suspense fallback={<OnProgress>Loading...</OnProgress>}>
        <ErrorBoundary onRetry={retryResource}>
          <TodoList resource={todosResource} onClick={toggleTodo} />
        </ErrorBoundary>
      </Suspense>
    </Section>
  );
}
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
