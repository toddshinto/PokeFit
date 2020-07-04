import React from 'react';
import { AppContext } from './app-context';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    this.context.setView('home');
    Promise.all([this.context.getItems(), this.context.getPokemon()]);
    this.context.getCurrentPosition();
    this.context.getStartPosition();
    this.context.getTimeWalked();
  }

  render() {
    let glow = '';
    let pressStartNight = '';
    if (this.context.timeOfDay === 'midnight' || this.context.timeOfDay === 'night') {
      glow = 'glow';
      pressStartNight = 'press-start-night';
    }
    return (
      <div className="main-background"
        style={{ backgroundImage: `url(assets/images/${this.context.timeOfDay}-bg.gif)` }}>
        <div className="pokefit-logo">
          <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
        </div>
        <div onClick={this.handleStart} className={`press-start ${pressStartNight}`}>PRESS START</div>
        <div className='start-sprites-container'>
          <div className={`pikachu-sprite-container ${glow}`} />
          <div className={`ash-sprite-container ${glow}`} />
        </div>
      </div>
    );
  }
}

Start.contextType = AppContext;
