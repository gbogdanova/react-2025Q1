import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useGetPlanetDetailsQuery } from '../../api/planets-api';
import Spinner from '../../components/Spinner';
import InfContext from '../../context/planets-context';

export default function DetailsPage() {
  const { theme } = useContext(InfContext);
  const router = useRouter();
  const { id } = router.query;
  const planetId = Array.isArray(id) ? id[0] : id;

  const {
    data: planetDetail,
    isLoading,
    isError,
  } = useGetPlanetDetailsQuery(planetId || '');

  if (isLoading) return <Spinner />;
  if (isError || !planetDetail) {
    return (
      <p
        className={
          theme === 'dark' ? 'bg-[#1a1f45] text-white ' : 'text-blue-950'
        }
      >
        No planet details available.
      </p>
    );
  }

  return (
    <section
      className={`flex flex-col gap-5 h-full p-4 border relative ${theme === 'dark' ? 'bg-[#1a1f45] text-white ' : 'text-blue-950'}`}
    >
      <button
        onClick={() => router.push('/')}
        className={`absolute top-2 right-2 text-gray-300 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-[#1a1f45]'}`}
      >
        ✖ Close
      </button>
      <h2 className="text-4xl font-bold mb-2 font-[Orbitron] text-amber-300">
        {planetDetail.name}
      </h2>
      <p>
        <span className="font-semibold">Rotation Period:</span>{' '}
        {planetDetail.rotation_period}
      </p>
      <p>
        <span className="font-semibold">Climate:</span> {planetDetail.climate}
      </p>
      <p>
        <span className="font-semibold">Gravity:</span> {planetDetail.gravity}
      </p>
      <p>
        <span className="font-semibold">Population:</span>{' '}
        {planetDetail.population}
      </p>
    </section>
  );
}
