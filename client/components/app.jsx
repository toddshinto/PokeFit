import React from 'react';
import HomePage from './home-page';
import Start from './start';
import Backpack from './backpack';
import Walk from './walk';
import Pokebox from './pokebox';
import Header from './header';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'walk',
      stats: null,
      pokemons: [],
      items: [],
      pokemonDetails: null,
      itemDetails: null,
      startLat: null,
      startLon: null,
      currLat: null,
      currLon: null,
      currMilesWalked: null,
      sessionTimeWalked: 0,
      startTime: 0,
      locationError: null,
      backgroundImage: null,
      timeOfDay: null,
      opened: false,
      action: null
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.setPokemonDetails = this.setPokemonDetails.bind(this);
    this.getStartPosition = this.getStartPosition.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.getTimeWalked = this.getTimeWalked.bind(this);
    this.setLocationError = this.setLocationError.bind(this);
    this.getBackground = this.getBackground.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.setAction = this.setAction.bind(this);
    this.getItems = this.getItems.bind(this);
    this.setItemDetails = this.setItemDetails.bind(this);
  }

  async componentDidMount() {
    this.getStats();
    this.getPokemon();
    this.getBackground();
    const d = new Date();
    const startTime = d.getTime();
    this.setState({ startTime });
    this.getItems();
    if (!this.state.stats) {
      this.setState({ stats: { milesWalked: 0, encounters: 0, timeWalked: 0 } });
    }
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
        if (!this.state.pokemonDetails && pokemons.length > 0) {
          this.setPokemonDetails(0);
        }
      })
      .catch(error => console.error(error));
  }

  getItems() {
    fetch('/api/backpack-items')
      .then(response => response.json())
      .then(items => {
        this.setState({ items });
        if (!this.state.itemDetails && items.length > 0) {
          this.setItemDetails(0);
        }
      })
      .catch(err => console.error(err));
  }

  getStartPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => this.setState({ startLat: position.coords.latitude, startLon: position.coords.longitude, locationError: null })
        , error => {
          switch (error.code) {
            case (0):
              this.setLocationError('Error unknown');
              break;
            case (1):
              this.setLocationError('Permission denied.');
              break;
            case (2):
              this.setLocationError('Position unavailable');
              break;
            case (3):
              this.setLocationError('Request timed out');
              break;
          }
        }, { enableHighAccuracy: true });
    }
  }

  setLocationError(locationError) {
    this.setState({ locationError });
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => this.setState({ currLat: position.coords.latitude, currLon: position.coords.longitude })
        , error => {
          switch (error.code) {
            case (0):
              this.setLocationError('Error unknown');
              break;
            case (1):
              this.setLocationError('Permission denied.');
              break;
            case (2):
              this.setLocationError('Position unavailable');
              break;
            case (3):
              this.setLocationError('Request timed out');
              break;
          }
        },
        { enableHighAccuracy: true });
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
    this.setState({ currMilesWalked: this.state.currMilesWalked + distance });
    if (this.state.currMilesWalked > 0.3) {
      this.setState(prevState => ({
        stats: {
          ...prevState.stats,
          milesWalked: this.state.stats.milesWalked + this.state.currMilesWalked
        },
        currMilesWalked: 0
      }));
      fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.stats)
      })
        .then(res => res.json())
        .then(data => process.stdout.write(data));
    }
  }

  setPokemonDetails(index) {
    const pokemons = this.state.pokemons;
    if (pokemons) {
      this.setState({ pokemonDetails: pokemons[index] });
    }
  }

  setItemDetails(index) {
    const items = this.state.items;
    if (items) {
      this.setState({ itemDetails: items[index] });
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

  openDrawer() {
    this.setState({ opened: !this.state.opened });
  }

  closeDrawer() {
    this.setState({ opened: false });
    this.getPokemon();
  }

  setAction(action) {
    this.setState({ action });
  }

  getBackground() {
    const d = new Date();
    const time = d.getHours();
    let backgroundImage = null;
    switch (time) {
      case (0):
      case (1):
      case (2):
      case (3):
      case (4):
        backgroundImage = 'midnight';
        break;
      case (5):
      case (6):
        backgroundImage = 'early-morning';
        break;
      case (7):
      case (8):
        backgroundImage = 'morning';
        break;
      case (9):
      case (10):
      case (11):
      case (12):
        backgroundImage = 'late-morning';
        break;
      case (13):
      case (14):
      case (15):
      case (16):
        backgroundImage = 'afternoon';
        break;
      case (17):
      case (18):
        backgroundImage = 'late-afternoon';
        break;
      case (19):
      case (20):
        backgroundImage = 'evening';
        break;
      case (21):
      case (22):
        backgroundImage = 'late-evening';
        break;
      case (23):
      case (24):
        backgroundImage = 'night';
        break;
    }
    this.setState({ backgroundImage: `/assets/images/${backgroundImage}-bg.png`, timeOfDay: backgroundImage });
  }

  render() {
    let display = null;
    switch (this.state.view) {
      case 'start':
        display = <Start
          timeOfDay={this.state.timeOfDay}
          backgroundImage={this.state.backgroundImage}
          setView={this.setView}
          getStartPosition={this.getStartPosition}
          getCurrentPosition={this.getCurrentPosition}
        />;
        break;
      case 'home':
        display = <HomePage
          timeOfDay={this.state.timeOfDay}
          stats={this.state.stats}
          setView={this.setView}
          backgroundImage={this.state.backgroundImage}
          timeWalked={this.state.sessionTimeWalked}
          pokemons={this.state.pokemons} />;
        break;
      case 'backpack':
        display = <Backpack
          items={this.state.items}
          itemDetails={this.state.itemDetails}
          setItemDetails={this.setItemDetails}
          setView={this.setView}
          timeOfDay={this.state.timeOfDay}
          backgroundImage={this.state.backgroundImage}
        />;
        break;
      case 'walk':
        display = <Walk
          timeWalked={this.state.sessionTimeWalked}
          stats={this.state.stats}
          setView={this.setView}
          timeOfDay={this.state.timeOfDay}
          backgroundImage={this.state.backgroundImage} />;
        break;
      case 'pokebox':
        display = <Pokebox
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          setAction={this.setAction}
          opened={this.state.opened}
          action={this.state.action}
          timeOfDay={this.state.timeOfDay}
          backgroundImage={this.state.backgroundImage}
          setView={this.setView}
          pokemons={this.state.pokemons}
          setPokemonDetails={this.setPokemonDetails}
          pokemonDetails={this.state.pokemonDetails}
          getPokemon={this.getPokemon}
        />;
        break;
    }
    return (
      this.state.view === 'home' || this.state.view === 'start'
        ? display
        : <div className="background-container" style={{ backgroundImage: `url(${this.state.backgroundImage})` }}>
          <Header />
          {display}
          <Footer
            view={this.state.view}
            setView={this.setView} />
        </div>
    );
  }
}
