import { Component } from 'react';

export default class TestBtn extends Component {
  state = { throwError: false };

  handleErrorClick() {
    this.setState({ throwError: true });
  }

  render() {
    if (this.state.throwError) {
      throw new Error(
        'Error Boundary testing success! Look at the console for more details.'
      );
    }
    return (
      <button onClick={this.handleErrorClick.bind(this)}>Trigger Error</button>
    );
  }
}
