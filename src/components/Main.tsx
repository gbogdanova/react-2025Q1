import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';
import Spinner from './Spinner';
import CardList from './CardList';

export default class Main extends Component {
  static contextType = FilmsContext;

  render() {
    const { loading } = this.context as FilmsContextType;

    return (
      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 p-6">
        {loading ? <Spinner /> : <CardList />}
      </main>
    );
  }
}
