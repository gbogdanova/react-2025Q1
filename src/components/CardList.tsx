import Country from '../interfaces';

interface CardListProp {
  countries: Country[];
}
export default function CardList({ countries }: CardListProp) {
  return (
    <>
      {countries.length > 0 ? (
        <ul>
          {countries.map((country, ind) => (
            <li key={ind}>
              <div>{country.name.common}</div>
              <div>{country.region}</div>
              <div>{country.population}</div>
              <div>
                <img
                  src={country.flags.png}
                  alt={country.name.official}
                  width="100"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no countries</p>
      )}
    </>
  );
}
