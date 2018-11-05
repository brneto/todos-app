import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  getFilter,
  getIsFetching,
  getErrorMessage,
  getVisibleTodos
} from '../redux/reducers';
import { fetchTodos, toggleTodo } from '../redux/actions';
import TodoList from './TodoList';
import FetchError from './FetchError';

const Section = styled.section`
  position: relative;
  border-top: 1px solid #e6e6e6;
  z-index: 2;
`;

const OnFetch = styled.p`
  margin-left: 1em;
`;

const mapStateToProps = state => ({
  filter: getFilter(state),
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
  todos: getVisibleTodos(state),
});

const mapDispatchToProps = {
  fetchTodos,
  toggleTodo,
};

@connect(mapStateToProps, mapDispatchToProps)
class VisibleTodoList extends Component {
  static propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    todos: PropTypes.array.isRequired,
  };

  fetchData = this.props.fetchTodos;

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  render() {
    const { isFetching, errorMessage, toggleTodo, todos } = this.props;

    let render = (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );

    if (isFetching && !todos.length) {
      render = <OnFetch>Loading...</OnFetch>;
    }

    if (errorMessage && !todos.length) {
      render = (
        <FetchError
          message={errorMessage}
          onRetry={this.fetchData}
        />
      );
    }

    return (
      <Section>{render}</Section>
    );
  }
}

export default VisibleTodoList;
