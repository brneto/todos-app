import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { effects } from '../redux/actions';
import {
  getIsFetching,
  getError,
  getVisibleTodos } from '../redux/reducers';
import Todo from './Todo';

const
  OnFetch = styled.p`
    margin-left: 1em;
  `,
  List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `;

const
  mapStateToProps = state => ({
    isFetching: getIsFetching(state),
    error: getError(state),
    todos: getVisibleTodos(state),
  }),
  mapDispatchToProps = {
    toggleTodo: effects.toggleTodo,
  },
  subscribe = connect(
    mapStateToProps,
    mapDispatchToProps
  );

function TodoList({ isFetching, error, todos, toggleTodo }) {

  // TODO: Replace the current "Loading..." approach by using the react Suspense component.
  // https://reactjs.org/docs/concurrent-mode-suspense.html
  if (isFetching) return <OnFetch>Loading...</OnFetch>;

  if (error) throw error;

  return todos.length ? (
    <List>
      {todos.map(({
        id,
        ...rest
      }) => (
        <Todo key={id} onClick={() => toggleTodo(id)} {...rest} />
      ))}
    </List>
  ) : null;
}
TodoList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(Error),
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};

export default subscribe(TodoList);
