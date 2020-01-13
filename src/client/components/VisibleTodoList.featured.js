import React from 'react';
import PropTypes from 'prop-types';
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
  propTypes = {
    todosResource: PropTypes.instanceOf(Promise).isRequired,
    getTodosResource: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

function VisibleTodoList({
  todosResource, getTodosResource, toggleTodo
}) {
  return (
    <Section>
      <ErrorBoundary onRetry={getTodosResource}>
        <TodoList resource={todosResource} onClick={toggleTodo} />
      </ErrorBoundary>
    </Section>
  );
}

VisibleTodoList.propTypes = propTypes;

export default VisibleTodoList;
