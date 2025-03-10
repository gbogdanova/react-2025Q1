import { useState } from 'react';

export default function TestBtn() {
  const [throwError, setThrowError] = useState(false);

  const handleErrorClick = () => {
    setThrowError((prevState) => !prevState);
  };

  if (throwError) {
    throw new Error('Error Boundary testing success!');
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4 lg:px-6 p-2 flex justify-end">
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
