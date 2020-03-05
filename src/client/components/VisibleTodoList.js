import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { commands, effects } from '../redux/actions';
import { getResource, getVisibleTodos, getFilterPath } from '../redux/reducers';
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
  mapStateToProps = state => ({
    resource: getResource(state),
    todos: getVisibleTodos(state),
  }),
  mapDispatchToProps = {
    createResource: commands.createResource,
    toggleTodo: effects.toggleTodo,
  },
  subscribe = connect(mapStateToProps, mapDispatchToProps),
  propTypes = {
    resource: PropTypes.object.isRequired,
    todos: PropTypes.array,
    createResource: PropTypes.func.isRequired,
    todosFetched: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({ resource, todos, createResource, todosFetched, toggleTodo }) {
  const handleRetry = () => getFilterPath() |> createResource;

  // http://blog.logrocket.com/react-suspense-for-data-fetching
  return (
    <Section>
      <Suspense fallback={<OnProgress>Loading...</OnProgress>}>
        <ErrorBoundary onRetry={handleRetry}>
          <TodoList
            resource={resource}
            todos={todos}
            onFetch={todosFetched}
            onClick={toggleTodo}
          />
        </ErrorBoundary>
      </Suspense>
    </Section>
  );
}
VisibleTodoList.propTypes = propTypes;

export default subscribe(VisibleTodoList);
