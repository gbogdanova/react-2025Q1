// import { ReactNode, useState } from 'react';
// import { useGetPlanetsQuery } from '../api/planets-api';
// import InfContext from './planets-context';
// import useSearchQuery from '../hooks/useSearchQuery';
// //import { useSearchParams } from 'react-router';

// interface PlanetsProviderProps {
//   children: ReactNode;
// }

// export default function InfProvider({ children }: PlanetsProviderProps) {
//   // const [searchParams, setSearchParams] = useSearchParams();

//   //const initialSearch = localStorage.getItem('searchState') || '';
//   //  const initialPage = Number(searchParams.get('page')) || 1;

//   const { searchQuery, setSearchQuery } = useSearchQuery(); // const [page, setPage] = useState<number>(initialPage);
//   const [theme, setTheme] = useState<string>('dark');

//   const { data, isLoading } = useGetPlanetsQuery({ searchState: searchQuery }); //, page

//   const updateSearchState = (search: string) => {
//     setSearchQuery(search);
//     // setPage(1);

//     const params = new URLSearchParams();
//     if (search) params.set('search', search);
//     //  params.set('page', '1');
//     // setSearchParams(params);
//   };

//   const updatePage = (newPage: number) => {
//     // setPage(newPage);

//     const params = new URLSearchParams();
//     if (searchQuery) params.set('search', searchQuery);
//     params.set('page', newPage.toString());
//     // setSearchParams(params);
//   };

//   return (
//     <InfContext.Provider
//       value={{
//         searchState: searchQuery,
//         updateSearchState,
//         results: data?.results || [],
//         loading: isLoading,
//         // page,
//         updatePage,
//         theme,
//         setTheme,
//       }}
//     >
//       {children}
//     </InfContext.Provider>
//   );
// }
