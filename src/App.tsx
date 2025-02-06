import InfProvider from './store/planets-proveder';
import ErrorBoundary from './components/ErrorBoundary';
import TestBtn from './components/TestBtn';
import { Routes, Route } from 'react-router';
import NotFound from './components/NotFound';
import Home from './components/Home';

export default function App() {
  return (
    <ErrorBoundary>
      <InfProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </InfProvider>
      <TestBtn />
    </ErrorBoundary>
  );
}
