import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getFilter, getIsFetching,
  getErrorMessage, getVisibleTodos
} from '../redux/reducers';
import { fetchTodos, toggleTodo } from '../redux/actions';
import TodoList from './TodoList';
import FetchError from './FetchError';

const
  Section = styled.section`
    position: relative;
    border-top: 1px solid #e6e6e6;
    z-index: 2;
  `,
  OnFetch = styled.p`
    margin-left: 1em;
  `;

function VisibleTodoList(props) {
 const {
   isFetching,
   errorMessage,
   fetchTodos,
   toggleTodo,
   todos,
   filter,
  } = props;

  // https://github.com/facebook/react/issues/14920
  useEffect(() => void fetchTodos(), [fetchTodos, filter]);

  let render = <TodoList todos={todos} onTodoClick={toggleTodo} />;
  if(!todos.length) {
    if(isFetching)
      render = <OnFetch>Loading...</OnFetch>;

    if(errorMessage)
      render = <FetchError message={errorMessage} onRetry={fetchTodos} />;
  }

  return <Section>{render}</Section>;
}
VisibleTodoList.propTypes = {
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  todos: PropTypes.array.isRequired,
};

const
  mapStateToProps = state => ({
    filter: getFilter(state),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
    todos: getVisibleTodos(state),
  }),
  mapDispatchToProps = {
    fetchTodos,
    toggleTodo,
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleTodoList);
