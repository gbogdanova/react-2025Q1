import { useContext } from 'react';
import InfContext from '../store/planets-context';
import Card from './Card';
import Pagination from './Pagination';

export default function CardList() {
  const { results } = useContext(InfContext);

  if (typeof results === 'string') {
    return (
      <div className="flex justify-center items-center text-red-500 h-100">
        <p>{results}</p>
      </div>
    );
  }
  return (
    <>
      {results.length === 0 ? (
        <div className="flex justify-center items-center text-red-500 h-100">
          <p>No results found for your search.</p>
        </div>
      ) : (
        <>
          <Pagination />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result, index) => (
              <Card key={index} planet={result} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
