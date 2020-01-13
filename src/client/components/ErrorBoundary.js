import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { effects } from '../redux/actions';
import { getFilter } from '../redux/reducers';

const
  OnError = styled.label`
    margin-left: 1em;

    & > button {
      margin: 1em .5em;
    }
  `;

const
  subscribe = connect(
    state => ({ filter: getFilter(state) }),
    { fetchTodos: effects.fetchTodos }
  );

@subscribe
class ErrorBoundary extends React.Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = { error: null };

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError = error => ({ error });

  componentDidMount = () => this.props.fetchTodos();

  componentDidUpdate = prevProps =>
    (this.props.filter !== prevProps.filter) && this.retryHandler();

  retryHandler = () =>
    this.setState({ error: null }) || void this.props.fetchTodos();

  render() {
    const {
      props: { children },
      state: { error },
      retryHandler,
    } = this;

    return error ? (
      <OnError>Could not fetch todos. {error.message}
        <button onClick={retryHandler}>Retry</button>
      </OnError>
    ) : children;
  }
}

export default ErrorBoundary;
