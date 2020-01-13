import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const
  OnError = styled.label`
    margin-left: 1em;

    & > button {
      margin: 1em .5em;
    }
  `;

class ErrorBoundary extends React.Component {
  static propTypes = {
    onRetry: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };

  state = { error: null };

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError = error => ({ error });

  retryHandler = () =>
    this.setState({ error: null }) || void this.props.onRetry();

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
