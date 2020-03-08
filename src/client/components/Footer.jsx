import React from 'react';
import { css } from '@emotion/core';
import FilterLink from './FilterLink';

const
  footerStyle = css`
    height: 20px;
    padding: 10px 15px;
    border-top: 1px solid #e6e6e6;
    color: #777;
    text-align: center;
  `;

const Footer = () => (
  <footer css={footerStyle}>
    <FilterLink filter="all">All</FilterLink>
    <FilterLink filter="active">Active</FilterLink>
    <FilterLink filter="completed">Completed</FilterLink>
  </footer>
);

export default Footer;
