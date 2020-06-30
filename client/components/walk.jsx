import React from 'react';

export default class Walk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  render() {
    let s;
    this.props.stats ? s = this.props.stats : s = { milesWalked: 0, encounters: 0 };
    return (
      <div className="pokedex-body">
        <div className="pokedex-screen-container">
          <div className="pokedex-display-screen" style={{ backgroundImage: `url(assets/images/${this.props.timeOfDay}-bg.gif)` }}>
            <div className="ash-walk-screen-container">
              <div className="ash-walk-screen" />
            </div>
          </div>
        </div>
        <div className="pokebox-screen-container">
          <div className="pokebox-rectangle-screen stats-walk-screen">
            <div className="stats-text stats-text-walk-screen">
              <p>MILES WALKED:</p>
              <p>{s.milesWalked > 0 ? s.milesWalked : 0}</p>
            </div>
            <div className="stats-text stats-text-walk-screen">
              <p>ENCOUNTERS:</p>
              <p>{s.encounters > 0 ? s.encounters : 0}</p>
            </div>
            <div className="stats-text stats-text-walk-screen">
              <p>TIME WALKED:</p>
              <p>{this.props.timeWalked}</p>
            </div>
            <div className="stats-text stats-text-walk-screen">
              <p>POKé BALLS:</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
