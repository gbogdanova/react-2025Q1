import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { fetchCharacters } from '../api/planets-api';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import { useEffect, useState, useContext } from 'react';
import Spinner from '../components/Spinner';
import { Character } from '../api/interface-api';
import CardList from '../components/CardList';
import Details from '../components/Details';
import InfContext from '../context/theme-context';
import Floyout from '../components/Flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface CharactersPageProps {
  characters: Character[];
  nextPage: number | null;
  prevPage: number | null;
  currentPage: number;
  searchQuery: string;
}

export const getServerSideProps: GetServerSideProps<
  CharactersPageProps
> = async (context) => {
  const page = Number(context.query.page) || 1;
  const searchQuery = context.query.search ? String(context.query.search) : '';

  const { results, next, prev } = await fetchCharacters(page, searchQuery);

  return {
    props: {
      characters: results,
      nextPage: next ? page + 1 : null,
      prevPage: prev ? page - 1 : null,
      currentPage: page,
      searchQuery,
    },
  };
};

export default function CharactersPage({
  characters,
  nextPage,
  prevPage,
  currentPage,
  searchQuery,
}: CharactersPageProps) {
  const router = useRouter();
  const { theme } = useContext(InfContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const hasSelectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const selectedCharacterId = router.query.details
    ? Number(router.query.details)
    : null;

  const selectedCharacter = characters.find(
    (char) => char.id === selectedCharacterId
  );

  useEffect(() => {
    if (selectedCharacterId) {
      setIsDetailLoading(true);
      setTimeout(() => setIsDetailLoading(false), 300);
    }
  }, [selectedCharacterId]);

  const handleSearch = (searchTerm: string) => {
    router.push(`/?page=1&search=${encodeURIComponent(searchTerm)}`);
  };

  const handleItemClick = (id: number) => {
    setIsDetailLoading(true);
    router.push(
      `/?page=${currentPage}&search=${encodeURIComponent(searchQuery)}&details=${id}`,
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearch={handleSearch} />
      <main
        className={`w-full mx-auto min-h-[calc(100vh-150px)] px-4 sm:px-6 lg:px-8 p-6 ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'} `}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Pagination
              prevPage={prevPage}
              nextPage={nextPage}
              searchQuery={searchQuery}
              currentPage={currentPage}
            />
            <div className="flex gap-4">
              <div className={selectedCharacterId ? 'w-1/2' : 'w-full'}>
                <CardList
                  characters={characters}
                  onItemClick={handleItemClick}
                />
              </div>

              {/* Right Section - Details View */}
              {selectedCharacterId && (
                <Details
                  selectedCharacter={selectedCharacter}
                  isDetailLoading={isDetailLoading}
                />
              )}
            </div>
            {hasSelectedItems.length > 0 && <Floyout />}
          </>
        )}
      </main>
    </>
  );
}
