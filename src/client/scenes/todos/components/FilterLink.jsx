import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/core';
import { effects } from '../../../redux/actions';

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
  subscribe = connect(null, { fetchTodos: effects.fetchTodos }),
  propTypes = {
    children: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
  };

const FilterLink = ({ children, filter, fetchTodos }) => (
  <NavLink
    css={linkStyle}
    activeStyle={activeStyle}
    exact to={`/${filter === 'all' ? '' : filter}`}
    onClick={() => fetchTodos(filter)}
  >{children}</NavLink>
);
FilterLink.propTypes = propTypes;

export default subscribe(FilterLink);
