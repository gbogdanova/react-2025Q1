import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';
import Card from './Card';

export default class CardList extends Component {
  static contextType = FilmsContext;
  render() {
    const { results } = this.context as FilmsContextType;
    return (
      <>
        {results.length === 0 ? (
          <p>No results found for your search.</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <Card key={index} film={result} />
            ))}
          </ul>
        )}
      </>
    );
  }
}
