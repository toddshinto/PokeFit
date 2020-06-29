import React from 'react';

export default class Walk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  render() {
    const background = this.props.backgroundImage;
    const s = this.props.stats;
    return (
      <div className="pokebox-body">
        <div className="pokebox-screen-container">
          <div className="pokemon-display-screen" style={{ backgroundImage: `url(${background})` }}>
            <div className="ash-walk-screen"></div>
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
              <p></p>
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
