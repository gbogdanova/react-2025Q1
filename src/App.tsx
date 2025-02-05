import Header from './components/Header';
import Main from './components/Main';
import FilmsProvider from './store/films-proveder';
import ErrorBoundary from './components/ErrorBoundary';
import TestBtn from './components/TestBtn';

export default function App() {
  return (
    <ErrorBoundary>
      <FilmsProvider>
        <Header />
        <Main />
      </FilmsProvider>
      <TestBtn />
    </ErrorBoundary>
  );
}
