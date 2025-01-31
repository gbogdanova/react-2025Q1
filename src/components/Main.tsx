import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';
import Spinner from './Spinner';

export default class Main extends Component {
  static contextType = FilmsContext;

  render() {
    const { results, loading } = this.context as FilmsContextType;

    return (
      <main>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {results.map((film, index) => (
              <li key={index}>{film.title}</li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}
