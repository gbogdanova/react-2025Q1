import { useState, useEffect } from 'react';
import './App.css';
import Country from './interfaces';
import CardList from './components/CardList';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

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
      }
    };
    fetchCountries();
  }, []);

  return (
    <>
      <CardList countries={countries} />
    </>
  );
}

export default App;
