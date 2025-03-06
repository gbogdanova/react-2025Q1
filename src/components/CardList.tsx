import { Character } from '../api/interface-api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { toggleItems } from '../redux/selectedItemsSlice';

interface CardListProps {
  characters: Character[];
  onItemClick: (id: number) => void;
}

export default function CardList({ characters, onItemClick }: CardListProps) {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {characters.length === 0 ? (
        <div className="flex justify-center items-center text-red-500 h-full">
          <p>No results found for your search.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char) => {
            const isChecked = selectedItems.some((item) => item.id === char.id);

            return (
              <li
                key={char.id}
                className="flex gap-5 border-1 border-cover p-2 cursor-pointer"
                onClick={() => onItemClick(char.id)}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => dispatch(toggleItems(char))}
                />
                <img
                  src={char.image}
                  alt={char.name}
                  width={100}
                  height={100}
                />
                <div className="flex flex-col">
                  <div className="text-xl pb-2 font-bold">{char.name}</div>
                  <div>{char.species}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
