import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useGetPlanetDetailsQuery } from '../api/planets-api';
import Spinner from './Spinner';
import InfContext from '../context/planets-context';

export default function Details() {
  const { theme } = useContext(InfContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: planetDetail,
    isLoading,
    isError,
  } = useGetPlanetDetailsQuery(id || '');

  if (isLoading) return <Spinner />;
  if (isError || !planetDetail) {
    return (
      <p
        className={
          theme === 'dark' ? 'bg-[#1a1f45]  text-white ' : 'text-blue-950'
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
        onClick={() => navigate('/')}
        className={`absolute top-2 right-2 text-gray-300 ${theme === 'dark' ? ' hover:text-white' : ' hover:text-[#1a1f45]'}`}
      >
        ✖ Close
      </button>
      <h2 className="text-4xl font-bold mb-2 font-[Orbitron] text-amber-300">
        {planetDetail.name}
      </h2>
      {/* For case when images will be returned
      <div className="flex py-6 justify-center items-center">
        <img
          className="object-center"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
          }}
          alt={planetDetail.name}
        />
      </div> */}
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
