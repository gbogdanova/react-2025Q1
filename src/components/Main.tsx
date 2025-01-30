import { Component } from 'react';

export default class Main extends Component {
  state = { results: [] };

  fetchFilms = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      console.log(data.results);
      this.setState({ results: data.results });
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  componentDidMount() {
    this.fetchFilms();
  }

  render() {
    return (
      <main>
        <div>Results list will be here</div>
      </main>
    );
  }
}
