// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { PlanetsType } from './interface-api';

// export const planetsApi = createApi({
//   reducerPath: 'planetsApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://swapi.dev/api/',
//   }),
//   endpoints: (builder) => ({
//     getPlanets: builder.query<
//       {
//         results: PlanetsType[];
//         next: string | null;
//       },
//       { searchState: string } //; page: number  , page
//     >({
//       query: ({ searchState }) => ({
//         url: 'planets',
//         params: { search: searchState }, //, page: String(page)
//       }),
//     }),
//     getPlanetDetails: builder.query<PlanetsType, string>({
//       query: (id) => `planets/${id}/`,
//     }),
//   }),
// });

// export const { useGetPlanetsQuery, useGetPlanetDetailsQuery } = planetsApi;
export async function fetchCharacters(
  page: number = 1,
  searchQuery: string = ''
) {
  try {
    const url = new URL('https://rickandmortyapi.com/api/character');
    url.searchParams.append('page', String(page));
    if (searchQuery) {
      url.searchParams.append('name', searchQuery); // 🔍 Search by name
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
