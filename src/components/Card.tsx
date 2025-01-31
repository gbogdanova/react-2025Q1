import { Component } from 'react';
import { FilmType } from '../api/interface-api';

interface CardProps {
  film: FilmType;
}

export default class Card extends Component<CardProps> {
  render() {
    const { film } = this.props;
    return (
      <li>
        <div>{film.title}</div>
        <div>{film.opening_crawl}</div>
        <img
          className="w-[300px] h-[300px]"
          src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
          alt=""
        />
      </li>
    );
  }
}
