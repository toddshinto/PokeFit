import React from 'react';

export default class HomePage extends React.Component {
  render() {
    const s = this.props.stats;
    const pokemons = this.props.pokemons;
    let nightLetters = '';
    if (this.props.timeOfDay === 'midnight' || this.props.timeOfDay === 'night') {
      nightLetters = 'night-letters';
    }
    return (
      <>
        <div className="main-background" style={{ backgroundImage: `url(${this.props.backgroundImage})` }}>
          <div className="pokefit-logo">
            <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
          </div>
          <div className="stats-screen-container"
            onClick={() => {
              this.props.setView('walk');
            }}>
            <div className="pokeball-icon top-right"></div>
            <div className="pokeball-icon top-left"></div>
            <div className="pokeball-icon bottom-right"></div>
            <div className="pokeball-icon bottom-left"></div>
            <div className={'stats-board'}>
              <div className="stats-text">
                <p>MILES WALKED</p>
                <p>{s.milesWalked}</p>
              </div>
              <div className="stats-text">
                <p>POKéBOX</p>
                <p>{pokemons.length > 0 ? pokemons.length : 0}</p>
              </div>
              <div className="stats-text">
                <p>TIME WALKED</p>
                <p>{this.props.timeWalked}</p>
              </div>
            </div>
          </div>
          <div className={`buttons-container ${nightLetters}`}>
            <div className="pokebox-button-container">
              <div onClick={() => this.props.setView('pokebox')} className="pokebox-button-icon button-icon"></div>
              <p className="button-text">POKéBOX</p>
            </div>
            <div className="backpack-button-container">
              <div onClick={() => this.props.setView('backpack')} className="backpack-button-icon button-icon"></div>
              <p className="button-text">BACKPACK</p>
            </div>
            <div className="walk-button-container">
              <div onClick={() => this.props.setView('walk')} className="walk-button-icon button-icon"></div>
              <p className="button-text">WALK</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
