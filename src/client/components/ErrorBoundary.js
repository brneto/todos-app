import React from 'react';
import PropTypes from 'prop-types';
import FetchError from './FetchError';

class ErrorBoundary extends React.Component {
  static propTypes = {
    onRetry: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = { error: null };

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError = error => ({ error });

  retryHandler = () => {
    this.setState({ error: null });
    this.props.onRetry();
  };

  render() {
    const {
      props: { children },
      state: { error },
      retryHandler: onRetry
    } = this;

    return error ? <FetchError {...{ error, onRetry }} /> : children;
  }
}

export default ErrorBoundary;
