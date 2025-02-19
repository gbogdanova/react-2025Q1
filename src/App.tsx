import InfProvider from './context/planets-proveder';
import ErrorBoundary from './components/ErrorBoundary';
import TestBtn from './components/TestBtn';
import { Routes, Route } from 'react-router';
import NotFound from './components/NotFound';
import Main from './components/Main';
import Details from './components/Details';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <InfProvider>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="details/:id" element={<Details />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TestBtn />
        </InfProvider>
      </Provider>
    </ErrorBoundary>
  );
}
