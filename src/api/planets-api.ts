const fetchFromAPI = async (searchState: string) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets?search=${searchState}`
      //&page=${page}
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error(error);
    return `Oops! Something went wrong while fetching the films. Please check your console for more details.`;
  }
};
export default fetchFromAPI;
