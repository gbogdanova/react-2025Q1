import React from 'react';
export default function Spinner() {
  return (
    <div id="spinner" className="min-h-200 flex justify-center items-center">
      <div
        data-testid="spinner"
        className="animate-spin rounded-full h-32 w-32 border-b-3 border-gray-200"
      ></div>
    </div>
  );
}
