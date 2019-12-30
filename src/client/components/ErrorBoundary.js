import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static propTypes = {
    onRetry: PropTypes.func.isRequired,
    fallback: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = { error: null };

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError = error => ({ error });

  render() {
    const
      { error } = this.state,
      { onRetry, fallback, children } = this.props;

    // You can render any custom fallback UI
    return error ? fallback({ error, onRetry }) : children;
  }
}

export default ErrorBoundary;
