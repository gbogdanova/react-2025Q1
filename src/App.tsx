import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Country from './interfaces';
import CardList from './components/CardList';
import Search from './components/Search';
import Filter from './components/Filter';

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('');
  const [search, setSearch] = useState<string>('');

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
    return countries.filter((country) => {
      const matchesRegion = region ? country.region === region : true;
      const matchSearch = search ? country.name.common.includes(search) : true;
      return matchesRegion && matchSearch;
    });
  }, [countries, region, search]);

  const handleSearch = (searchQuary: string) => {
    setSearch(searchQuary);
  };

  const handleFilter = (selectedRegion: string) => {
    setRegion(selectedRegion === 'all' ? '' : selectedRegion);
  };

  return (
    <>
      <Filter onFilter={handleFilter} />
      <Search onSearch={handleSearch} />
      <CardList countries={filterCountries} />
    </>
  );
}
