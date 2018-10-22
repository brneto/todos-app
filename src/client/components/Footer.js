import React from 'react';
import styled from 'styled-components';
import FilterLink from './FilterLink';

const Foot = styled.footer`
  height: 20px;
  padding: 10px 15px;
  border-top: 1px solid #e6e6e6;
  color: #777;
  text-align: center;

  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    box-shadow:
      0 1px 1px rgba(0, 0, 0, .2),
      0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, .2),
      0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, .2);
    content: "";
    overflow: hidden;
  }
`;

const Footer = () => (
  <Foot>
    <FilterLink filter="all">
      All
    </FilterLink>
    <FilterLink filter="active">
      Active
    </FilterLink>
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </Foot>
);

export default Footer;
