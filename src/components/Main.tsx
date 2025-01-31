import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';

export default class Main extends Component {
  static contextType = FilmsContext;

  render() {
    const { results } = this.context as FilmsContextType;

    return (
      <main>
        <h2 className="text-xl font-bold">Results:</h2>
        <ul>
          {results.map((film, index) => (
            <li key={index}>{film.title}</li>
          ))}
        </ul>
      </main>
    );
  }
}
