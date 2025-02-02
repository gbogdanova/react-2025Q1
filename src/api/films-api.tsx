const fetchFilmsFromAPI = async (searchState: string) => {
  const searchValue = searchState ? `?search=${searchState}` : '';
  try {
    const response = await fetch(`https://swapi.dev/api/films${searchValue}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(error);
    return `Oops! Something went wrong while fetching the films. Please check your console for more details.`;
  }
};
export default fetchFilmsFromAPI;
