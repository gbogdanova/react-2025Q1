import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
  searchQuery: string;
}

export default function Pagination({
  prevPage,
  nextPage,
  searchQuery,
  currentPage,
}: PaginationProps) {
  const btnClass =
    'text-2xl cursor-pointer disabled:text-gray-500 disabled:cursor-default';

  return (
    <div className="my-3 flex gap-4 justify-center">
      {prevPage && (
        <Link
          href={`/?page=${prevPage}&search=${encodeURIComponent(searchQuery)}`}
          className={btnClass}
        >
          ←
        </Link>
      )}
      <span className="text-xl">{currentPage}</span>
      {nextPage && (
        <Link
          href={`/?page=${nextPage}&search=${encodeURIComponent(searchQuery)}`}
          className={btnClass}
        >
          →
        </Link>
      )}
    </div>
  );
}
