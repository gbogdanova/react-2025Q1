import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';

class Search extends Component {
  static contextType = FilmsContext;

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setSearchState } = this.context as FilmsContextType;
    setSearchState(event.target.value.trim());
  };

  handleSearch = () => {
    const { searchState } = this.context as FilmsContextType;
    localStorage.setItem('searchState', searchState);
  };

  render() {
    const { searchState } = this.context as FilmsContextType;
    return (
      <div className="flex justify-end gap-5 w-full">
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          value={searchState}
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
