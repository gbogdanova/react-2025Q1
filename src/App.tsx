import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Country from './interfaces';
import CardList from './components/CardList';
import Search from './components/Search';
import Filter from './components/Filter';
import Sort from './components/Sort';

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data: Country[] = await response.json();
        console.log(data);
        setCountries(data);
      } catch (error) {
        console.error(error);
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  const filterCountries = useMemo(() => {
    const filtered = countries.filter((country) => {
      const matchesRegion = region ? country.region === region : true;
      const matchSearch = search ? country.name.common.includes(search) : true;
      return matchesRegion && matchSearch;
    });

    switch (sort) {
      case '1':
        return filtered.sort((a, b) => a.population - b.population);
      case '2':
        return filtered.sort((a, b) => b.population - a.population);
      case '3':
        return filtered.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      case '4':
        return filtered.sort((a, b) =>
          b.name.common.localeCompare(a.name.common)
        );
      default:
        return filtered;
    }
  }, [countries, region, search, sort]);

  const handleSearch = (searchQuary: string) => {
    setSearch(searchQuary);
  };

  const handleFilter = (selectedRegion: string) => {
    setRegion(selectedRegion === 'all' ? '' : selectedRegion);
  };
  const handleSort = (sort: string) => {
    setSort(sort);
  };

  return (
    <>
      <header className="flex justify-between mb-6">
        <Sort onSort={handleSort} />
        <Filter onFilter={handleFilter} />
        <Search onSearch={handleSearch} />
      </header>

      <CardList countries={filterCountries} />
    </>
  );
}
