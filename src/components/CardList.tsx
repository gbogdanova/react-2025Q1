import { useCallback, useMemo } from 'react';
import Country from '../interfaces';
import Card from './Card';

interface CardListProp {
  countries: Country[];
}

export default function CardList({ countries }: CardListProp) {
  const visitedCountries = useMemo(() => {
    return JSON.parse(localStorage.getItem('visitedCountries') || '[]');
  }, []);

  const toggleVisited = useCallback(
    (country: string) => {
      const newVisit = visitedCountries.includes(country)
        ? visitedCountries.filter((name: string) => name !== country)
        : [...visitedCountries, country];

      localStorage.setItem('visitedCountries', JSON.stringify(newVisit));
    },
    [visitedCountries]
  );

  return (
    <>
      {countries.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countries.map((country) => {
            const isVisited = visitedCountries.includes(country.name.common);

            return (
              <Card
                country={country}
                isVisited={isVisited}
                key={country.name.common}
                toggle={toggleVisited}
              />
            );
          })}
        </ul>
      ) : (
        <p>There are no countries</p>
      )}
    </>
  );
}
