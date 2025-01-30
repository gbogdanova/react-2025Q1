import { Component } from 'react';

interface SearchState {
  searchState: string;
}

class Search extends Component<object, SearchState> {
  state: SearchState = {
    searchState: localStorage.getItem('searchState') || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchState: event.target.value.trim() });
  };

  handleSearch = () => {
    localStorage.setItem('searchState', this.state.searchState);
  };

  render() {
    return (
      <div className="flex justify-end gap-5 w-full">
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          value={this.state.searchState}
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
