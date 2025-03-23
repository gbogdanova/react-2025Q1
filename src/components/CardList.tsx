import { useEffect, useState } from 'react';
import Country from '../interfaces';
import Card from './Card';

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
              <Card
                country={country}
                isVisited={isVisited}
                key={ind}
                toggle={toggleVisited}
              />
            );
          })}
        </ul>
      ) : (
        <p>There is no countries</p>
      )}
    </>
  );
}
