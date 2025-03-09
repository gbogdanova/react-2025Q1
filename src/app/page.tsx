'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import { fetchCharacters } from '../api/planets-api';
import { Character } from '../api/interface-api';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import CardList from '../components/CardList';
import InfContext from '../context/theme-context';
import Details from '../components/Details';
import ErrorBoundary from '../components/ErrorBoundary';
import TestBtn from '../components/TestBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Floyout from '../components/Flyout';

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { theme } = useContext(InfContext);
  const page = Number(searchParams.get('page')) || 1;
  const detailsId = searchParams.get('details');

  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchCharacters(page, searchQuery);

        const { results, next, prev } = data;
        setCharacters(results);
        setNextPage(next);
        setPrevPage(prev);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handlePageChange = (newPage: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('page', String(newPage));
    window.history.pushState({}, '', newUrl.toString());
  };

  const handleItemClick = (id: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('details', String(id));
    window.history.pushState({}, '', newUrl.toString());
  };

  const selectedCharacter = characters.find(
    (character) => character.id === Number(detailsId)
  );

  return (
    <ErrorBoundary>
      <Suspense>
        <Header />
        <main
          className={`w-full mx-auto min-h-[calc(100vh-150px)] px-4 sm:px-6 lg:px-8 p-6 ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'} `}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {characters.length === 0 ? (
                <p>No results found for your search.</p>
              ) : (
                <>
                  <Pagination
                    prevPage={prevPage}
                    nextPage={nextPage}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                  <div className="flex gap-4">
                    <div className={selectedCharacter ? 'w-1/2' : 'w-full'}>
                      <CardList
                        characters={characters}
                        onItemClick={handleItemClick}
                      />
                    </div>
                    {selectedCharacter && (
                      <Details
                        selectedCharacter={selectedCharacter}
                        isDetailLoading={isLoading}
                      />
                    )}
                  </div>
                  {selectedItems.length > 0 && <Floyout />}
                </>
              )}
            </>
          )}
        </main>
        <TestBtn />
      </Suspense>
    </ErrorBoundary>
  );
}
