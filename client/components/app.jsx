import React from 'react';
import HomePage from './home-page';
import Start from './start';
import Backpack from './backpack';
import Walk from './walk';
import Pokebox from './pokebox';
import Encounter from './encounter';
import Header from './header';
import Footer from './footer';
import ItemModal from './item-modal';
import PokemonModal from './pokemon-modal';
import CaptureSuccessModal from './capture-success-modal';
import CaptureFailModal from './capture-fail-modal';
import BerryUsedModal from './berry-used-modal';
import TookItemModal from './took-item-modal';
import LeftItemModal from './left-item-modal';
import ApproveRun from './approve-run';
import { AppContext } from './app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      stats: { milesWalked: 0, encounters: 0, timeWalked: 0 },,
      pokemons: [],
      items: [],
      pokemonDetails: null,
      itemDetails: null,
      startLat: null,
      startLon: null,
      currLat: null,
      currLon: null,
      currMilesWalked: 0,
      sessionTimeWalked: 0,
      locationError: null,
      encounters: 0,
      backgroundImage: null,
      timeOfDay: null,
      opened: false,
      action: null,
      encounterType: null,
      wildPokemon: null,
      foundItem: null,
      encounterModal: true,
      totalEncounters: 0,
      berries: 0,
      startTime: null,
      captureSucces: false
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
    this.getEncounter = this.getEncounter.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setEncounterType = this.setEncounterType.bind(this);
    this.attemptCatch = this.attemptCatch.bind(this);
    this.attemptBerry = this.attemptBerry.bind(this);
    this.captureSuccess = this.captureSuccess.bind(this);
    this.takeItem = this.takeItem.bind(this);
    this.toggleEncounterModal = this.toggleEncounterModal.bind(this);
    this.setCaughtDetails = this.setCaughtDetails.bind(this);
    this.getStartTime = this.getStartTime.bind(this);
  }

  componentDidMount() {
    this.getStats();
    this.getBackground();
    this.getStartTime();
    this.getStartPosition();
    this.getCurrentPosition();
  }

  resetState() {
    this.setState({
      wildPokemon: null,
      berries: 0,
      foundItem: null,
      encounterType: null
    });
  }

  getStartTime() {
    const startTime = new Date().getTime();
    this.setState({ startTime });
  }

  getTimeWalked() {
    const startTime = this.state.startTime;
    setInterval(() => {
      const currentTime = new Date().getTime();
      const sessionTimeWalked = Math.round((currentTime - startTime) / 60000);
      this.setState({ sessionTimeWalked });
      if (!this.state.encounterType) {
        if (this.state.sessionTimeWalked % 2 === 0) {
          this.getEncounter();
        }
      }
    }, 25000);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let tempValue = null;
    let randomIndex = null;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  }

  getEncounter() {
    const encounterOptions = this.shuffle(['item', 'item', 'pokemon', 'pokemon', 'pokemon']);
    const thisEncounterType = encounterOptions.pop();
    const quantity = Math.floor(Math.random() * 5) + 1;
    const itemOptions = Math.floor(Math.random() * 26) + 1;
    this.setState({ totalEncounters: this.state.totalEncounters + 1 });
    if (thisEncounterType === 'item') {
      fetch(`/api/items/${itemOptions}`)
        .then(res => res.json())
        .then(item => this.setState({ foundItem: { ...item, quantity }, encounterType: thisEncounterType, encounterModal: true }));
    } else if (thisEncounterType === 'pokemon') {
      const randomPokemon = Math.floor(Math.random() * 151) + 1;
      fetch(`/api/pokemon/${randomPokemon}`)
        .then(res => res.json())
        .then(pokemon => this.setState({ wildPokemon: pokemon, encounterType: thisEncounterType, encounterModal: true }));
    }
  }

  setEncounterType(type) {
    this.setState({ encounterType: type });
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
        position => {
          this.setState({ currLat: position.coords.latitude, currLon: position.coords.longitude });
          this.calculateDistance(this.state.startLat, this.state.startLon, this.state.currLat, this.state.currLon);
        }
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
    this.setState(prevState => ({
      stats: {
        ...prevState.stats,
        milesWalked: this.state.stats.milesWalked + this.state.currMilesWalked
      }
    }));
    const sendStats = {
      ...this.state.stats,
      milesWalked: this.state.stats.milesWalked.toFixed(2) * 100
    };
    fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendStats)
    })
      .catch(err => console.error(err));
  }

  attemptCatch(ball) {
    const multiplier = ball.effect;
    const randomRoll = Math.floor(Math.random() * 300) + 1;
    const captureRate = this.state.wildPokemon.captureRate;
    const berry = this.state.berries;
    fetch('/api/backpack-items/use', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ball)
    })
      .then(this.getItems())
      .catch(err => console.error(err));
    if (ball.item_id === 1) {
      const caughtPokemon = { ...this.state.wildPokemon, ballSprite: ball.sprite, itemId: ball.item_id };
      this.captureSuccess(caughtPokemon);
    } else {
      if (randomRoll - berry <= (captureRate * multiplier)) {
        const caughtPokemon = { ...this.state.wildPokemon, ballSprite: ball.sprite, itemId: ball.item_id };
        this.captureSuccess(caughtPokemon);
      } else {
        this.setState({ encounterType: 'capture-fail' });
        this.toggleEncounterModal();
      }
    }
  }

  captureSuccess(caughtPokemon) {
    fetch('/api/pokeboxes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(caughtPokemon)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ encounterType: 'capture-success' });
        this.toggleEncounterModal();
      });
  }

  takeItem() {
    const item = this.state.foundItem;
    fetch('/api/backpack-items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(data => {
        this.getItems();
      });
  }

  attemptBerry(berry) {
    fetch('/api/backpack-items/use', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(berry)
    })
      .then(this.getItems())
      .catch(err => console.error(err));
    this.setState({ berries: this.state.berries + Number(berry.effect), encounterType: 'used-berry' });
    this.toggleEncounterModal();
  }

  setPokemonDetails(index) {
    const pokemons = this.state.pokemons;
    if (pokemons) {
      this.setState({ pokemonDetails: pokemons[index] });
    }
  }

  setCaughtDetails(pokemon) {
    this.setState({ pokemonDetails: pokemon });
    this.resetState();
  }

  setItemDetails(index) {
    const items = this.state.items;
    if (items) {
      this.setState({ itemDetails: items[index] });
    }
  }

  toggleEncounterModal() {
    this.setState({ encounterModal: !this.state.encounterModal });
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
        backgroundImage = 'late-afternoon';
        break;
      case (18):
      case (19):
        backgroundImage = 'evening';
        break;
      case (20):
        backgroundImage = 'late-evening';
        break;
      case (21):
      case (22):
      case (23):
      case (24):
        backgroundImage = 'night';
        break;
    }
    this.setState({ backgroundImage: `/assets/images/${backgroundImage}-bg.png`, timeOfDay: backgroundImage });
  }

  render() {
    let display = null;
    let modal = null;
    switch (this.state.view) {
      case 'start':
        display = <Start />;
        break;
      case 'home':
        display = <HomePage />;
        break;
      case 'backpack':
        display = <Backpack />;
        break;
      case 'walk':
        display = <Walk />;
        break;
      case 'pokebox':
        display = <Pokebox />;
        break;
      case 'encounter':
        display = <Encounter />;
    }
    switch (this.state.encounterType) {
      case 'approve-run':
        if (this.state.encounterModal) {
          modal = <ApproveRun />;
        }
        break;
      case 'item':
        if (this.state.encounterModal) {
          modal = <ItemModal />;
        }
        break;
      case 'took-item':
        if (this.state.encounterModal) {
          modal = <TookItemModal />;
        }
        break;
      case 'left-item':
        if (this.state.encounterModal) {
          modal = <LeftItemModal />;
        }
        break;
      case 'pokemon' :
        if (this.state.encounterModal) {
          modal = <PokemonModal />;
        }
        break;
      case 'capture-success' :
        if (this.state.encounterModal) {
          modal = <CaptureSuccessModal />;
        }
        break;
      case 'capture-fail' :
        if (this.state.encounterModal) {
          modal = <CaptureFailModal />;
        }
        break;
      case 'used-berry' :
        if (this.state.encounterModal) {
          modal = <BerryUsedModal />;
        }
    }
    return (
      <AppContext.Provider value={{
        timeOfDay: this.state.timeOfDay,
        timeWalked: this.state.sessionTimeWalked,
        stats: this.state.stats,
        totalEncounters: this.state.totalEncounters,
        pokemons: this.state.pokemons,
        items: this.state.items,
        opened: this.state.opened,
        action: this.state.action,
        encounterModal: this.state.encounterModal,
        encounterType: this.state.encounterType,
        pokemonDetails: this.state.pokemonDetails,
        itemDetails: this.state.itemDetails,
        wildPokemon: this.state.wildPokemon,
        sessionTimeWalked: this.state.sessionTimeWalked,
        foundItem: this.state.foundItem,
        backgroundImage: this.state.backgroundImage,
        getTimeWalked: this.getTimeWalked,
        setItemDetails: this.setItemDetails,
        getStats: this.getStats,
        setView: this.setView,
        getItems: this.getItems,
        getPokemon: this.getPokemon,
        getStartPosition: this.getStartPosition,
        getCurrentPosition: this.getCurrentPosition,
        setPokemonDetails: this.setPokemonDetails,
        openDrawer: this.openDrawer,
        closeDrawer: this.closeDrawer,
        setAction: this.setAction,
        getEncounter: this.getEncounter,
        shuffle: this.shuffle,
        resetState: this.resetState,
        takeItem: this.takeItem,
        setEncounterType: this.setEncounterType,
        toggleEncounterModal: this.toggleEncounterModal,
        attemptCatch: this.attemptCatch,
        attemptBerry: this.attemptBerry,
        setCaughtDetails: this.setCaughtDetails
      }}>
        {this.state.view === 'home' || this.state.view === 'start'
          ? display
          : <div className="background-container-container" style={{ backgroundImage: `url(${this.state.backgroundImage})` }}>
            <div className="background-container" >
              <Header />
              {modal}
              {display}
              <Footer />
            </div>
          </div>}
      </AppContext.Provider>
    );
  }
}
