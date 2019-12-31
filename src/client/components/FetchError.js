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

const FetchError = ({ error, onRetry }) => (
  <OnError>Could not fetch todos. {error.message}
    <button onClick={onRetry}>Retry</button>
  </OnError>
);
FetchError.propTypes = {
  error: PropTypes.objectOf(Error).isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
