import React from 'react';
import Country from '../interfaces';

interface CardProps {
  country: Country;
  isVisited: boolean;
  toggle: (name: string) => void;
}

const Card = ({ country, isVisited, toggle }: CardProps) => {
  return (
    <li
      className={`flex gap-5 border-1 border-cover p-2 ${isVisited ? 'bg-yellow-100 text-sky-900' : 'bg-sky-200'}`}
    >
      <div className="w-[40%]">
        <img
          src={country.flags.png}
          alt={country.name.official}
          className="h-auto max-w-full object-fill"
        />
      </div>
      <div className="w-[60%]">
        <div>{country.name.common}</div>
        <div>{country.region}</div>
        <div>{country.population}</div>
        <button
          onClick={() => toggle(country.name.common)}
          className="mt-1 px-2 rounded-2xl bg-sky-500 hover:cursor-pointer"
        >
          {isVisited ? 'Remove from Visited' : ' Mark as Visited'}
        </button>
      </div>
    </li>
  );
};

export default React.memo(Card);
