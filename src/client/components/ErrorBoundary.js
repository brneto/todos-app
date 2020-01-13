import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { effects } from '../redux/actions';
import { getFilter } from '../redux/reducers';

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
    fallbackComponent: PropTypes.func.isRequired,
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
      props: { fallbackComponent, children },
      state: { error },
      retryHandler: onRetry
    } = this;

    return error ? fallbackComponent({ error, onRetry }) : children;
  }
}

export default ErrorBoundary;
