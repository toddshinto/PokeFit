import React from 'react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
  }

  render() {
    const s = this.props.stats;
    return (
      <div>
        <h1 onClick={() => this.props.setView('start')}>Home Page</h1>
        <ul>
          <li>Miles walked: {s.milesWalked}</li>
          <li>total encounters: {s.encounters}</li>
          <li>time Walked: {s.timeWalked}</li>
        </ul>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
