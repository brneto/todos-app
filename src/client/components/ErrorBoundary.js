import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const
  OnError = styled.label`
    margin-left: 1em;

    & > button {
      margin: 1em .5em;
    }
  `;

class ErrorBoundary extends Component {
  static propTypes = {
    onRetry: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = { error: null };

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError = error => ({ error });

  render() {
    const
      { error } = this.state,
      { children, onRetry } = this.props;

    // You can render any custom fallback UI
    return error ? (
        <OnError>Could not fetch todos. {error.message}
          <button onClick={onRetry}>Retry</button>
        </OnError>
      ) : children;
  }
}

export default ErrorBoundary;
