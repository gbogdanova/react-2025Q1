import FilmsContext from '../store/films-context';
import Spinner from './Spinner';
import CardList from './CardList';
import { useContext } from 'react';

export default function Main() {
  const { loading } = useContext(FilmsContext);
  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 p-6">
      {loading ? <Spinner /> : <CardList />}
    </main>
  );
}
