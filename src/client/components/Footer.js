import React from 'react';
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

const Footer = () => (
  <Foot>
    <FilterLink filter="all">All</FilterLink>
    <FilterLink filter="active">Active</FilterLink>
    <FilterLink filter="completed">Completed</FilterLink>
  </Foot>
);

export default Footer;
