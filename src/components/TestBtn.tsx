import React from 'react';
import { useContext, useState } from 'react';
import InfContext from '../context/theme-context';

export default function TestBtn() {
  const { theme } = useContext(InfContext);

  const [throwError, setThrowError] = useState(false);

  const handleErrorClick = () => {
    setThrowError((prevState) => !prevState);
  };

  if (throwError) {
    throw new Error('Error Boundary testing success!');
  }

  return (
    <div
      className={`w-full px-2 sm:px-4 lg:px-6 p-2 flex justify-end ${theme === 'dark' ? 'bg-[#1a1f45]' : ''}`}
    >
      {' '}
      <button
        className="border-1 text-red-600 px-4 py-2 rounded-lg hover:opacity-75 hover:cursor-pointer"
        onClick={handleErrorClick}
      >
        Trigger Error
      </button>
    </div>
  );
}
