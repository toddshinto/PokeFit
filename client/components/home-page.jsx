import React from 'react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  render() {
    const s = this.props.stats;
    return (
      <>
        <div className="mai-background">
          <div className="pokefit-logo">
            <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
          </div>
          <div className="stats-screen-container">
            <div className="pokeball-icon top-right"></div>
            <div className="pokeball-icon top-left"></div>
            <div className="pokeball-icon bottom-right"></div>
            <div className="pokeball-icon bottom-left"></div>
            <div className="stats-board">
              <div className="stats-text">
                <p>MILES WALKED</p>
                <p>{s.milesWalked}</p>
              </div>
              <div className="stats-text">
                <p>POKéBOX</p>
                <p>4</p>
              </div>
              <div className="stats-text">
                <p>TIME WALKED</p>
                <p>{s.timeWalked}</p>
              </div>
            </div>
            <div className="buttons-container">
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
        </div>
      </>
    );
  }
}
