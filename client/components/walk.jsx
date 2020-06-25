import React from 'react';

export default class Walk extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
    this.getBackground = this.getBackground.bind(this);
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
      case (18):
        backgroundImage = 'late-afternoon';
        break;
      case (19):
      case (20):
        backgroundImage = 'evening';
        break;
      case (21):
      case (22):
        backgroundImage = 'late-evening';
        break;
      case (23):
      case (24):
        backgroundImage = 'night';
        break;
    }
    return backgroundImage;
  }

  render() {
    const backround = this.getBackground();
    const s = this.props.stats;
    return (
      <div className={backround}>
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
