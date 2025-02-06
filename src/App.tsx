import Header from './components/Header';
import Main from './components/Main';
import InfProvider from './store/planets-proveder';
import ErrorBoundary from './components/ErrorBoundary';
import TestBtn from './components/TestBtn';

export default function App() {
  return (
    <ErrorBoundary>
      <InfProvider>
        <Header />
        <Main />
      </InfProvider>
      <TestBtn />
    </ErrorBoundary>
  );
}
