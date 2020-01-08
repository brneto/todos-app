import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// TODO: Replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  StyledLink = styled(NavLink).attrs(() => ({
    activeStyle: {
      cursor: 'not-allowed',
      borderColor: 'rgba(175, 47, 47, .2)',
    }
  }))`
    position: relative;
    margin: 3px;
    padding: 3px 7px;
    border: 1px solid transparent;
    border-radius: 3px;
    color: inherit;
    text-decoration: none;

    &.active:active {
      color: inherit;
      pointer-events: none;
    }
  `;

const
  propTypes = {
    filter: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  },
  FilterLink = ({ filter, children, onClick }) => (
    <StyledLink exact to={`/${filter === 'all' ? '' : filter}`} onClick={() => onClick(filter)}>
      {children}
    </StyledLink>
  );

FilterLink.propTypes = propTypes;

export default FilterLink;
