import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Width extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    width: window.innerWidth,
  };

  handleResize = () => this.setState({ width: window.innerWidth });

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { width } = this.state;
    return this.props.children(width);
  }
}

const MyResponsiveComponent = () => (
  <Width>
    {width => (
      <p>Window width is {width}</p>
    )}
  </Width>
);

export default MyResponsiveComponent;
