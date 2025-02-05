import { FilmType } from '../api/interface-api';

interface CardProps {
  film: FilmType;
}

export default function Card({ film }: CardProps) {
  return (
    <li className="flex  gap-3 border-1 border-cover p-2">
      <div className="w-[40%]">
        <img
          className="h-auto max-w-full object-fill"
          src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`}
          alt={film.title}
        />
      </div>
      <div className="w-[60%]">
        <div className=" text-xl font-bold">{film.title}</div>
        <div>{film.opening_crawl}</div>
      </div>
    </li>
  );
}
