import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { unselectAll } from '../redux/selectedItemsSlice';

export default function Floyout() {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );
  const dispatch = useDispatch<AppDispatch>();

  const caption =
    selectedItems.length > 1
      ? `${selectedItems.length} items are selected`
      : `${selectedItems.length} item is selected`;

  const btnClass =
    'border-1 px-4 py-2 rounded-lg cursor-pointer hover:opacity-70';
  return (
    <div className="flex gap-3 py-4">
      <div className="py-2">{caption}</div>
      <button
        className={btnClass}
        onClick={() => {
          dispatch(unselectAll());
        }}
      >
        Unselect all
      </button>
      <button className={btnClass}>Download</button>
    </div>
  );
}
