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

function FetchError({ message, onRetry }) {
  return (
    <OnError>Could not fetch todos. {message}
      <button onClick={() => onRetry()}>Retry</button>
    </OnError>
  );
}
FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
