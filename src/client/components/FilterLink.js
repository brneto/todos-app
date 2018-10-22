import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink).attrs({
activeStyle: {
    cursor: 'not-allowed',
    borderColor: 'rgba(175, 47, 47, .2)',
  }
})`
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

const FilterLink = ({ filter, children }) => (
  <StyledLink exact to={`/${filter === 'all' ? '' : filter}`}>
    {children}
  </StyledLink>
);
FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FilterLink;
