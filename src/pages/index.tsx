import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import InfContext from '../context/planets-context';
import Spinner from '../components/Spinner';
import CardList from '../components/CardList';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import Details from './details/[id]'; // Import the Details component

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function MainPage() {
  const { loading, theme } = useContext(InfContext);
  const router = useRouter();
  const { id } = router.query;
  const hasSelectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  // Detect if Details component should be shown
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    setIsDetailsOpen(!!id); // Show details if an ID exists in the URL
  }, [id]);

  // Close details when clicking outside
  const handleOutsideClick = () => {
    if (isDetailsOpen) {
      router.push('/'); // Navigate back to the main page
    }
  };

  return (
    <>
      <Header onClick={handleOutsideClick} />
      <main
        className={`w-full mx-auto min-h-[calc(100vh-150px)] px-4 sm:px-6 lg:px-8 p-6 ${theme === 'dark' ? 'bg-[#1a1f45]' : 'text-blue-950'}`}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Pagination />
            <div className="flex gap-4">
              <div className={isDetailsOpen ? 'w-1/2' : 'w-full'}>
                <CardList />
              </div>

              {/* Show Details component when URL includes /details/:id */}
              {isDetailsOpen && (
                <div className="w-1/2">
                  <Details />
                </div>
              )}
            </div>
            {hasSelectedItems.length > 0 && <Flyout />}
          </>
        )}
      </main>
    </>
  );
}
