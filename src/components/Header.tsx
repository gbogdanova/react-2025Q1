import { Component } from 'react';
import Search from './Search';

class Header extends Component {
  render() {
    return (
      <header className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 p-6 bg-stone-500">
        <Search />
      </header>
    );
  }
}
export default Header;
