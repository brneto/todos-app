import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  OnError = styled.label({
    marginLeft: '1em',

    '& > button': {
      margin: '1em .5em',
    }
  });

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
