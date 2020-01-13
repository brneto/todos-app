import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilterLink from './FilterLink';

const
  Foot = styled.footer`
    height: 20px;
    padding: 10px 15px;
    border-top: 1px solid #e6e6e6;
    color: #777;
    text-align: center;
  `;

const
  propTypes = {
    getTodosResource: PropTypes.func.isRequired,
  };

function Footer({ getTodosResource }) {

  // https://github.com/facebook/react/issues/14920
  useEffect(() => void getTodosResource(), [getTodosResource]);

  return (
    <Foot>
      <FilterLink filter="all" onClick={getTodosResource}>
        All
      </FilterLink>
      <FilterLink filter="active" onClick={getTodosResource}>
        Active
      </FilterLink>
      <FilterLink filter="completed" onClick={getTodosResource}>
        Completed
      </FilterLink>
    </Foot>
  );
}

Footer.propTypes = propTypes;

export default Footer;
