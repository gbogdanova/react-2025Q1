import { useContext } from 'react';
import InfContext from '../store/planets-context';

export default function Pagination() {
  const { page, updatePage, results } = useContext(InfContext);

  const btnClass =
    'text-2xl cursor-pointer disabled:text-gray-500 disabled:cursor-default';

  return (
    <div className="my-3 flex gap-4 justify-center">
      <button
        className={btnClass}
        onClick={() => updatePage(+page - 1)}
        disabled={page === 1}
      >
        ←
      </button>
      <span className="text-xl">{page}</span>
      <button
        className={btnClass}
        onClick={() => updatePage(+page + 1)}
        disabled={page === 6 || results.length < 10}
      >
        →
      </button>
    </div>
  );
}
