import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OnError = styled.label`
  margin-left: 1em;
`;

const FetchError = ({ message, onRetry }) => (
  <OnError>Could not fetch todos. {message} &nbsp;
    <button onClick={onRetry}>Retry</button>
  </OnError>
);

FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
