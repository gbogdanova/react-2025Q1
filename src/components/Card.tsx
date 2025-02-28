//import Link from 'next/link';
import { PlanetsType } from '../api/interface-api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toggleItems } from '../redux/selectedItemsSlice';
import { useRouter } from 'next/router';

interface CardProps {
  planet: PlanetsType;
}

export default function Card({ planet }: CardProps) {
  const router = useRouter();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const dispatch = useDispatch<AppDispatch>();

  const isChecked = selectedItems.some((item) => item.url === planet.url);

  const planetId = planet.url.split('/')[5];

  return (
    <li
      className="flex gap-5 border-1 border-cover p-2"
      onClick={() => router.push(`/details/${planetId}`)}
    >
      <div className="flex w-full">
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => dispatch(toggleItems(planet))}
          />
          <div className="text-xl pb-2 font-bold">{planet.name}</div>
          <div className="text-xl">
            <span className="text-amber-200">Rotation period:</span>{' '}
            {planet.rotation_period}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Climate:</span> {planet.climate}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Gravity:</span> {planet.gravity}
          </div>
          <div className="text-xl">
            <span className="text-amber-200">Population:</span>{' '}
            {planet.population}
          </div>
        </div>
      </div>
    </li>
  );
}
