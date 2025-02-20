import { useContext, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import InfContext from '../context/planets-context';
import Spinner from './Spinner';
import CardList from './CardList';
import Header from './Header';
import Pagination from './Pagination';
import Floyout from './Flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function Main() {
  const { loading, theme } = useContext(InfContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const hasSelectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems
  );

  useEffect(() => {
    setIsDetailsOpen(location.pathname.startsWith('/details/'));
  }, [location.pathname]);

  const handleOutsideClick = () => {
    if (isDetailsOpen) {
      navigate('/');
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

              {isDetailsOpen && (
                <div className="w-1/2">
                  <Outlet />
                </div>
              )}
            </div>
            {hasSelectedItems.length > 0 && <Floyout />}
          </>
        )}
      </main>
    </>
  );
}
