import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { commands } from '../redux/actions';
import FilterLink from './FilterLink';

const
  footerStyle = css`
    height: 20px;
    padding: 10px 15px;
    border-top: 1px solid #e6e6e6;
    color: #777;
    text-align: center;
  `;

const
  subscribe = connect(null, { createResource: commands.createResource }),
  propTypes = { createResource: PropTypes.func.isRequired };

function Footer({ createResource }) {
  // https://github.com/facebook/react/issues/14920
  // useEffect(() => void fetchTodos(), [fetchTodos]);
  const handleClick = f => () => createResource(f);

  return (
    <footer css={footerStyle}>
      <FilterLink filter="all" onClick={handleClick('all')}>All</FilterLink>
      <FilterLink filter="active" onClick={handleClick('active')}>Active</FilterLink>
      <FilterLink filter="completed" onClick={handleClick('completed')}>Completed</FilterLink>
    </footer>
  );
}
Footer.propTypes = propTypes;

export default subscribe(Footer);
