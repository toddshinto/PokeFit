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
      position: {
        startLat: null,
        startLon: null,
        currLat: null,
        currLon: null
      },
      currMilesWalked: null
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
    this.getStartPosition = this.getStartPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
  }

  componentDidMount() {
    this.getStats();
    this.getPokemon();
    this.getStartPosition();
    this.getCurrentPosition();
  }

  getPokemon() {
    fetch('/api/pokeboxes')
      .then(response => response.json())
      .then(pokemons => {
        this.setState({ pokemons });
        this.setPokemonDetails(0);
      });
  }

  getStartPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setState({
          position: {
            startLat: position.coords.latitude,
            startLon: position.coords.longitude
          }
        }), error => {
          switch (error.code) {
            case (0):
              console.error('Error unknown');
              break;
            case (1):
              alert('Permission denied. Permission must be enabled to track walk distance');
              break;
            case (2):
              console.error('Position unavailable');
              break;
            case (3):
              console.error('Request timed out');
              break;
          }
        });
    }
  }

  getCurrentPosition() {
    const location = this.state.position;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({
            position: {
              currLat: position.coords.latitude,
              currLon: position.coords.longitude
            }
          });
          this.calculateDistance(location.startLat, location.startLon, location.currLat, location.currLon);
        }, error => {
          switch (error.code) {
            case (0):
              console.error('Error unknown');
              break;
            case (1):
              alert('Permission denied. Permission must be enabled to track walk distance');
              break;
            case (2):
              console.error('Position unavailable');
              break;
            case (3):
              console.error('Request timed out');
              break;
          }
        });
    }
  }

  calculateDistance(startLat, startLon, currLat, currLon) {
    if ((startLat === currLat) && (startLon === currLon)) {
      return 0;
    }
    const radStartLat = Math.PI * startLat / 180;
    const radCurrLat = Math.PI * currLat / 180;
    const theta = startLon - currLon;
    const radTheta = Math.PI * theta / 180;
    let distance = Math.sin(radStartLat) * Math.sin(radCurrLat) + Math.cos(radStartLat) * Math.cos(radCurrLat) * Math.cos(radTheta);
    if (distance > 1) {
      distance = 1;
    }
    distance = Math.acos(distance);
    distance = distance * 180 / Math.PI;
    distance = distance * 60 * 1.1515;
    this.setState({ currMilesWalked: distance });
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
        display = <Walk stats={this.state.stats} setView={this.setView} />;
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
