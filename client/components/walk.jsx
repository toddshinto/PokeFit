import React from 'react';

export default class Walk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  render() {
    const s = this.props.stats;
    return (
      <div>
        <h1>Walk Screen</h1>
        <ul>
          <li>Miles walked: {s.milesWalked}</li>
          <li>total encounters: {s.encounters}</li>
          <li>time Walked: {s.timeWalked}</li>
        </ul>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>

      </div>
    );
  }
}
