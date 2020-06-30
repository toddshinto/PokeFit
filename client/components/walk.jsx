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
        <div className="pokedex-screen-container">
          <div className="pokedex-rectangle-screen stats-walk-screen">
            <div className="pokedex-headline">STATS</div>
            <div className="stats">
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">MILES WALKED: </div>
                <div className="stats-number">{s.milesWalked > 0 ? s.milesWalked : 0} </div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">ENCOUNTERS: </div>
                <div className="stats-number">{this.props.encounters}</div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">TIME WALKED: </div>
                <div className="stats-number">{this.props.timeWalked} </div>
              </div>
              <div className="stats-text stats-text-walk-screen">
                <div className="stats-label">POKé BALLS: </div>
                <div className="stats-number">{this.props.timeWalked}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
