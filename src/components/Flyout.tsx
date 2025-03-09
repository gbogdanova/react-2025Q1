'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { unselectAll } from '../redux/selectedItemsSlice';
import { Character } from '../api/interface-api';
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
      '"Name","Status","Species","Gender","Image"\n' +
      selectedItems
        .map(
          (char: Character) =>
            `${char.name},${char.status},${char.species},${char.gender},${char.image}`
        )
        .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setFileName(`${selectedItems.length}_characters.csv`);
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
