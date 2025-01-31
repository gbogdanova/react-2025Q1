import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';

class Search extends Component {
  static contextType = FilmsContext;

  state = {
    tempSearchState: localStorage.getItem('searchState') || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tempSearchState: event.target.value.trim() });
  };

  handleSearch = () => {
    const { setSearchState } = this.context as FilmsContextType;
    setSearchState(this.state.tempSearchState);
  };

  render() {
    return (
      <div className="flex justify-end gap-5 w-full">
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          value={this.state.tempSearchState}
          onChange={this.handleChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
