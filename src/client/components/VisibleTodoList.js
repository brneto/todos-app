import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { effects } from '../redux/actions';
import { getFilter } from '../redux/reducers';
import TodoList from './TodoList';
import ErrorBoundary from './ErrorBoundary';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `;

function VisibleTodoList({ fetchTodos, filter }) {
  // https://github.com/facebook/react/issues/14920
  useEffect(
    () => console.info('[Effect]') ?? void fetchTodos(),
    [fetchTodos, filter]
  );

  // TODO: Verify whether useEffect is really needed
  // TODO: since this component render will always be
  // TODO: called whenever the filter props changes.
  console.info('[Render]');
  return (
    <Section>
      <ErrorBoundary onRetry={fetchTodos}>
        <TodoList />
      </ErrorBoundary>
    </Section>
  );
}
VisibleTodoList.propTypes = {
  filter: PropTypes.string.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default connect(
  state => ({ filter: getFilter(state) }),
  { fetchTodos: effects.fetchTodos }
)(VisibleTodoList);
