import React from 'react';

interface PaginationProps {
  currentPage: number;
  nextPage: string | null;
  prevPage: string | null;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  prevPage,
  nextPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const btnClass =
    'text-2xl cursor-pointer disabled:text-gray-500 disabled:cursor-default';

  return (
    <div className="my-3 flex gap-4 justify-center">
      {prevPage && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className={btnClass}
        >
          ←
        </button>
      )}
      <span className="text-xl">{currentPage}</span>
      {nextPage && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className={btnClass}
        >
          →
        </button>
      )}
    </div>
  );
}
