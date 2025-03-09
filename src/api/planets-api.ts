export async function fetchCharacters(
  page: number = 1,
  searchQuery: string = ''
) {
  try {
    const url = new URL('https://rickandmortyapi.com/api/character');
    url.searchParams.append('page', String(page));
    if (searchQuery) {
      url.searchParams.append('name', searchQuery);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();

    return {
      results: data.results || [],
      next: data.info.next,
      prev: data.info.prev,
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { results: [], next: null, prev: null };
  }
}
