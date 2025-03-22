import { useEffect, useState } from 'react';
import Country from '../interfaces';

interface CardListProp {
  countries: Country[];
}

export default function CardList({ countries }: CardListProp) {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    setVisitedCountries(
      JSON.parse(localStorage.getItem('visitedCountries') || '[]')
    );
  }, []);
  const toggleVisited = (country: string) => {
    const newVisit = visitedCountries.includes(country)
      ? visitedCountries.filter((name) => name != country)
      : [...visitedCountries, country];

    setVisitedCountries(newVisit);
    localStorage.setItem('visitedCountries', JSON.stringify(newVisit));
  };

  return (
    <>
      {countries.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countries.map((country, ind) => {
            const isVisited = visitedCountries.includes(country.name.common);

            return (
              <li
                key={ind}
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
                    onClick={() => toggleVisited(country.name.common)}
                    className="mt-1 px-2 rounded-2xl bg-sky-500 hover:cursor-pointer"
                  >
                    {isVisited ? 'Remove from Visited' : ' Mark as Visited'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There is no countries</p>
      )}
    </>
  );
}
