import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { effects } from '../redux/actions';
import FilterLink from './FilterLink';

// TODO: Replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  Foot = styled.footer({
    height: '20px',
    padding: '10px 15px',
    borderTop: '1px solid #e6e6e6',
    color: '#777',
    textAlign: 'center',
  });

const
  subscribe = connect(null, { fetchTodos: effects.fetchTodos }),
  propTypes = { fetchTodos: PropTypes.func.isRequired };

function Footer({ fetchTodos }) {

  // https://github.com/facebook/react/issues/14920
  useEffect(() => void fetchTodos(), [fetchTodos]);

  return (
    <Foot>
      <FilterLink filter="all" onClick={fetchTodos}>
        All
      </FilterLink>
      <FilterLink filter="active" onClick={fetchTodos}>
        Active
      </FilterLink>
      <FilterLink filter="completed" onClick={fetchTodos}>
        Completed
      </FilterLink>
    </Foot>
  );
}

Footer.propTypes = propTypes;

export default subscribe(Footer);
