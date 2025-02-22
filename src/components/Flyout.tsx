import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { unselectAll } from '../redux/selectedItemsSlice';
import { PlanetsType } from '../api/interface-api';
import { useState } from 'react';

export default function Floyout() {
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleDowload = () => {
    const csvData =
      '"Name","Diameter","Population","Gravity","Url"\n' +
      selectedItems
        .map(
          (planet: PlanetsType) =>
            `${planet.name},${planet.diameter},${planet.population},${planet.gravity},${planet.url}`
        )
        .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setFileName(`${selectedItems.length}_planets.csv`);
  };

  const caption =
    selectedItems.length > 1
      ? `${selectedItems.length} items are selected`
      : `${selectedItems.length} item is selected`;

  const btnClass = 'border-1 rounded-lg cursor-pointer hover:opacity-70';
  return (
    <div className="flex gap-3 py-4">
      <div className="py-2">{caption}</div>
      <button
        className={`${btnClass}  px-4 py-2 `}
        onClick={() => {
          dispatch(unselectAll());
        }}
      >
        Unselect all
      </button>
      <button className={btnClass} onClick={() => handleDowload()}>
        <a
          href={downloadUrl}
          download={fileName}
          id="downloadLink"
          className="block w-full h-full px-4 py-2 "
        >
          Download
        </a>
      </button>
    </div>
  );
}
