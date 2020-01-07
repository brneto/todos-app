import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: First replace by object notation
// TODO: https://www.styled-components.com/docs/advanced#style-objects
// TODO: Then experiment replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
const
  OnError = styled.label`
    margin-left: 1em;

    & > button {
      margin: 1em .5em;
    }
  `;

const
  propTypes = {
    error: PropTypes.objectOf(Error).isRequired,
    onRetry: PropTypes.func.isRequired,
  },
  FetchError = ({ error, onRetry }) => (
    <OnError>Could not fetch todos. {error.message}
      <button onClick={onRetry}>Retry</button>
    </OnError>
  );

FetchError.propTypes = propTypes;

export default FetchError;
