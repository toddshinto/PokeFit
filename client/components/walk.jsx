import React from 'react';
import { AppContext } from './app-context';

export default class Walk extends React.Component {
  render() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let am = 'AM';
    if (hours < 10) { hours = '0' + hours; }
    if (minutes < 10) { minutes = '0' + minutes; }
    if (hours > 12) { hours = hours - 12; am = 'PM'; }
    return (
      <div className="pokedex-body">
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(assets/images/${this.context.timeOfDay}-bg-sm.gif)` }}>
            <div className="ash-walk-screen-container">
              <div className="pikachu-walk-screen" />
              <div className="ash-walk-screen" />
            </div>
          </div>
        </div>
        <div className="pokedex-screen-container">
          <div className="pokedex-rectangle-screen stats-walk-screen">
            <div className="pokedex-headline">STATS</div>
            <div className="stats">
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">MILES WALKED: </div>
                <div className="stats-number">{this.context.currMilesWalked.toFixed(2)} </div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">ENCOUNTERS: </div>
                <div className="stats-number">{this.context.totalEncounters}</div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">MINS WALKED: </div>
                <div className="stats-number">{this.context.sessionTimeWalked} </div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">CURRENT TIME: </div>
                <div className="stats-number">{hours}:{minutes}<span style={{ fontSize: '.8em' }}>{am}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Walk.contextType = AppContext;
