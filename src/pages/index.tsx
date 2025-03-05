import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { fetchCharacters } from '../api/planets-api';

// Define the type for a character
interface Character {
  id: number;
  name: string;
  image: string;
}

// Define the type for page props
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
  const [search, setSearch] = useState<string>(searchQuery);

  // Handle search submission
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() === searchQuery) return; // Avoid unnecessary reload
    router.push(`/?page=1&search=${encodeURIComponent(search)}`);
  };

  return (
    <main>
      <h1>Rick and Morty Characters</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search characters..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <img src={char.image} alt={char.name} width={50} height={50} />
            {char.name}
          </li>
        ))}
      </ul>

      <div>
        {prevPage && (
          <Link
            href={`/?page=${prevPage}&search=${encodeURIComponent(searchQuery)}`}
          >
            Previous
          </Link>
        )}
        {currentPage}
        {nextPage && (
          <Link
            href={`/?page=${nextPage}&search=${encodeURIComponent(searchQuery)}`}
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
