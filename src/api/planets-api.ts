import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlanetsType } from './interface-api';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
  }),
  endpoints: (builder) => ({
    getPlanets: builder.query<
      {
        results: PlanetsType[];
        next: string | null;
      },
      { searchState: string; page: number }
    >({
      query: ({ searchState, page }) => ({
        url: 'planets',
        params: { search: searchState, page: String(page) },
      }),
    }),
    getPlanetDetails: builder.query<PlanetsType, string>({
      query: (id) => `planets/${id}/`,
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetDetailsQuery } = planetsApi;
