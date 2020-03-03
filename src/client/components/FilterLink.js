import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { effects } from '../redux/actions';

const
  StyledLink = styled(NavLink).attrs({
    activeStyle: {
      borderColor: 'rgba(175, 47, 47, .2)',
      cursor: 'not-allowed',
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

const
  subscribe = connect(null, { fetchTodos: effects.fetchTodos }),
  propTypes = {
    filter: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
  };

const FilterLink = ({ filter, children, fetchTodos }) => (
  <StyledLink exact to={`/${filter === 'all' ? '' : filter}`} onClick={() => fetchTodos(filter)}>
    {children}
  </StyledLink>
);
FilterLink.propTypes = propTypes;

export default subscribe(FilterLink);
