import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/core';

const
  linkStyle = css`
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
  `,
  activeStyle={
    borderColor: 'rgba(175, 47, 47, .2)',
    cursor: 'not-allowed',
  };

const
  propTypes = {
    filter: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  },
  FilterLink = ({ filter, children, onClick }) => (
    <NavLink
      css={linkStyle}
      activeStyle={activeStyle}
      exact to={`/${filter === 'all' ? '' : filter}`}
      onClick={onClick}>
      {children}
    </NavLink>
  );
FilterLink.propTypes = propTypes;

export default FilterLink;
