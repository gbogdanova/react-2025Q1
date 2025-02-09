import { Link } from 'react-router';
import { PlanetsType } from '../api/interface-api';

interface CardProps {
  planet: PlanetsType;
}

export default function Card({ planet }: CardProps) {
  const planetId = planet.url.split('/')[5];

  return (
    <li className="flex gap-5 border-1 border-cover p-2">
      <Link to={`/details/${planetId}`} className="flex w-full">
        <div className="w-[40%]">
          <img
            className="h-auto max-w-full object-fill"
            src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
            }}
            alt={planet.name}
          />
        </div>
        <div className="w-[60%]">
          <div className="text-xl pb-2 font-bold">{planet.name}</div>
          <div className="text-xl">
            <span className="text-amber-200">Rotation period:</span>{' '}
            {planet.rotation_period}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Climate:</span> {planet.climate}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Gravity:</span> {planet.gravity}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Population:</span>{' '}
            {planet.population}
          </div>
        </div>
      </Link>
    </li>
  );
}
