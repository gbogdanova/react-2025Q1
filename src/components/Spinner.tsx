import { Component } from 'react';

export default class Spinner extends Component {
  render() {
    return (
      <div className="min-h-200 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-3 border-gray-200"></div>
      </div>
    );
  }
}
