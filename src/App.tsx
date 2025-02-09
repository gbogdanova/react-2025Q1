import InfProvider from './store/planets-proveder';
import ErrorBoundary from './components/ErrorBoundary';
import TestBtn from './components/TestBtn';
import { Routes, Route } from 'react-router';
import NotFound from './components/NotFound';
import Main from './components/Main';
import Details from './components/Details';

export default function App() {
  return (
    <ErrorBoundary>
      <InfProvider>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="details/:id" element={<Details />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </InfProvider>
      <TestBtn />
    </ErrorBoundary>
  );
}
