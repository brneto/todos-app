import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { produce } from 'immer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions';

@connect()
class AddTodo extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  state = { todo: '' };
  addTodo = bindActionCreators(addTodo, this.props.dispatch);

  handleChange = ({ target }) =>
    this.setState(produce(draft => {
      draft.todo = target.value;
    }));

  handleKeyDown = ({ keyCode }) => {
    if (keyCode === 13) { //ENTER_KEY
      this.setState(produce(draft => {
        this.addTodo(draft.todo.trim());
        draft.todo = '';
      }));
    }
  };

  render() {
    const formProps = {
      input: {
        value: this.state.todo,
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown
      }
    };

    // const { render: Comp } = this.props;
    // return <Comp {...formProps} />;
    const { render } = this.props;
    return render(formProps);
  }
}

export default AddTodo;
