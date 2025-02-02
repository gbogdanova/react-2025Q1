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
      <div className="flex justify-end gap-3">
        <input
          className="border  border-[#1A237E] rounded-lg p-2 focus:outline-none shadow-lg shadow-blue-500/50 focus:ring-[#ffffff]"
          type="text"
          placeholder="Search..."
          value={this.state.tempSearchState}
          onChange={this.handleChange}
        />
        <button
          className="border-1 rounded-lg border-amber-200 text-amber-200 px-4 py-2  hover:opacity-75 hover:cursor-pointer"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
