import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as hooks from '../hooks';

const StyledDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  font-weight: bold;
`;

// Server-sent Events component
function SSEListener({ eventSourceUrl }) {
  const notices = hooks.useNotices(eventSourceUrl);// My custom Hook

  return <StyledDiv>SSE messages: {notices.join(', ')}</StyledDiv>;
}
SSEListener.propTypes = {
  eventSourceUrl: PropTypes.string.isRequired,
};

export default SSEListener;
