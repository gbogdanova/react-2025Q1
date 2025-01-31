const fetchFilmsFromAPI = async (searchState: string) => {
  const searchValue = searchState ? `?search=${searchState}` : '';
  try {
    const response = await fetch(`https://swapi.dev/api/films${searchValue}`);
    const data = await response.json();
    console.log(data.results);
    return data.results || [];
  } catch (error) {
    console.error('Error fetching films:', error);
    return [];
  }
};
export default fetchFilmsFromAPI;
