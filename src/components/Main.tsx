import { useContext, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import FilmsContext from '../store/planets-context';
import Spinner from './Spinner';
import CardList from './CardList';
import Header from './Header';
import Pagination from './Pagination';

export default function Main() {
  const { loading } = useContext(FilmsContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
        className="w-full mx-auto px-4 sm:px-6 lg:px-8 p-6"
        onClick={handleOutsideClick}
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
                <div className="w-1/2" onClick={(e) => e.stopPropagation()}>
                  <Outlet />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
