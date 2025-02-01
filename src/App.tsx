import { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import FilmsProvider from './store/films-context';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <FilmsProvider>
          <Header />
          <Main />
        </FilmsProvider>
      </ErrorBoundary>
    );
  }
}
export default App;
