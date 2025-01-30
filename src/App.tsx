import { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import FilmsProvider from './store/films-context';

class App extends Component {
  render() {
    return (
      <FilmsProvider>
        <Header />
        <Main />
      </FilmsProvider>
    );
  }
}
export default App;
