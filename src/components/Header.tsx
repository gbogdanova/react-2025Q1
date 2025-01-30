import { Component } from 'react';
import Search from './Search';
import FilmsProvider from '../store/films-context';

class Header extends Component {
  render() {
    return (
      <header className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 p-6 bg-stone-500">
        <FilmsProvider>
          <Search />
        </FilmsProvider>
      </header>
    );
  }
}
export default Header;
