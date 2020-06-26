import React from 'react';
import HomePage from './home-page';
import Start from './start';
import Backpack from './backpack';
import Walk from './walk';
import Pokebox from './pokebox';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      stats: null,
      pokemons: [],
      pokemonDetails: null,
      sessionTimeWalked: 0,
      startTime: 0
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
    this.getTimeWalked = this.getTimeWalked.bind(this);
  }

  componentDidMount() {
    this.getStats();
    this.getPokemon();
    const d = new Date();
    const startTime = d.getTime();
    this.setState({ startTime });

  }

  getTimeWalked() {

    if (!this.state.timeWalked) {
      const startTime = this.state.startTime;
      let currentTime = 0;
      let timeDiff = 0;
      setInterval(() => {
        const d = new Date();
        currentTime = d.getTime();
        timeDiff = currentTime - startTime;
        const tw = Math.round(timeDiff / 60000);
        this.setState({ sessionTimeWalked: tw });
      }, 60001);
    }
  }

  getPokemon() {
    fetch('/api/pokeboxes')
      .then(response => response.json())
      .then(pokemons => {
        this.setState({ pokemons });
        this.setPokemonDetails(0);
      });
  }

  setPokemonDetails(index) {
    if (this.state.pokemons) {
      this.setState({ pokemonDetails: this.state.pokemons[index] });
    }
  }

  getStats() {
    fetch('/api/users')
      .then(res => res.json())
      .then(stats => this.setState({ stats }))
      .catch(err => console.error(err.message));
  }

  setView(view) {
    this.setState({ view });
    this.getTimeWalked();
  }

  render() {
    let display = null;
    switch (this.state.view) {
      case 'start':
        display = <Start setView={this.setView} />;
        break;
      case 'home':
        display = <HomePage
          stats={this.state.stats}
          setView={this.setView}
          pokemons={this.state.pokemons}/>;
        break;
      case 'backpack':
        display = <Backpack setView={this.setView} />;
        break;
      case 'walk':
        display = <Walk timeWalked={this.state.sessionTimeWalked} stats={this.state.stats} setView={this.setView} />;
        break;
      case 'pokebox':
        display = <Pokebox
          setView={this.setView}
          pokemons={this.state.pokemons}
          setPokemonDetails={this.setPokemonDetails}
          pokemonDetails={this.state.pokemonDetails}
        />;
        break;
    }
    return (
      display
    );
  }
}
