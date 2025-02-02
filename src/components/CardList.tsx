import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';
import Card from './Card';

export default class CardList extends Component {
  static contextType = FilmsContext;
  render() {
    const { results } = this.context as FilmsContextType;
    if (typeof results === 'string') {
      return (
        <div className="flex justify-center items-center text-red-500 h-100">
          <p>{results}</p>
        </div>
      );
    }
    return (
      <>
        {results.length === 0 ? (
          <div className="flex justify-center items-center text-red-500 h-100">
            <p>No results found for your search.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result, index) => (
              <Card key={index} film={result} />
            ))}
          </ul>
        )}
      </>
    );
  }
}
