const fetchFromAPI = async (searchState: string, page: number) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets?search=${searchState}&page=${page}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(error);
    return `Oops! Something went wrong while fetching the planets.`;
  }
};

export default fetchFromAPI;
