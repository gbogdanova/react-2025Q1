import { useState, useEffect, useMemo } from 'react';
import './App.css';
import Country from './interfaces';
import CardList from './components/CardList';
import Search from './components/Search';
import Filter from './components/Filter';

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('');

  const fetchCountries = async (query: string) => {
    let url = 'https://restcountries.com/v3.1/all';
    if (query) {
      url = `https://restcountries.com/v3.1/name/${query}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data: Country[] = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error(error);
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchCountries('');
  }, []);

  const handleSearch = (query: string) => {
    fetchCountries(query);
  };

  const filterCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion = region ? country.region === region : true;
      return matchesRegion;
    });
  }, [countries, region]);

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
