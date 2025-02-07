import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Spinner from './Spinner';
import { PlanetsType } from '../api/interface-api';
import { fetchPlanetDetails } from '../api/planets-api';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planetDetail, setPlanetDetail] = useState<PlanetsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          setLoading(true);
          const result = await fetchPlanetDetails(id);
          setPlanetDetail(result);
        }
      } catch (error) {
        console.error('Error fetching planet details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <Spinner />;
  if (!planetDetail)
    return <p className="text-white">No planet details available.</p>;

  return (
    <section className="flex flex-col gap-5 h-full p-4 border bg-gray-800 text-white relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-2 right-2 text-gray-300 hover:text-white"
      >
        ✖ Close
      </button>
      <h2 className="text-4xl font-bold mb-2 font-[Orbitron] text-amber-300">
        {planetDetail.name}
      </h2>
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
      </div>
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
