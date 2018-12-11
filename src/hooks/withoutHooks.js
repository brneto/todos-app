import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Media extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    matches: null,
  };

  render() {
    return this.props.children(this.state.matches);
  }
}

const App = () => (
  <Media query="(max-width: 400px)">
    {small => (
      <Media query="(min-width: 800px)">
        {large => (
          <div className="Media">
            <h1>Media</h1>
            <p>
              Small? {small ? 'Yep' : 'Nope'}.
            </p>
            <p>
              Large? {large ? 'Yep' : 'Nope'}.
            </p>
          </div>
        )}
      </Media>
    )}
  </Media>
);

export default App;
