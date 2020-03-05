import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const
errorStyle  = css`
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
    <label css={errorStyle}>Could not fetch todos. {error.message}
      <button onClick={onRetry}>Retry</button>
    </label>
  );

FetchError.propTypes = propTypes;

export default FetchError;
