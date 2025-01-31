import { Component } from 'react';
import { FilmsContext, FilmsContextType } from '../store/films-context';
import Spinner from './Spinner';
import CardList from './CardList';

export default class Main extends Component {
  static contextType = FilmsContext;

  render() {
    const { loading } = this.context as FilmsContextType;

    return <main>{loading ? <Spinner /> : <CardList />}</main>;
  }
}
