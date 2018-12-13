import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Width extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    width: window.innerWidth
  };

  handleResize = () => this.setState({
    width: window.innerWidth
  });

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { children } = this.props;
    const { width } = this.state;
    return children(width);
  }
}

const WithoutHooksComponent = () => (
  <Width>
    {width => <h1>Window width is {width}.</h1>}
  </Width>
);

export default WithoutHooksComponent;
