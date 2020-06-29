import React from 'react';

export default class Start extends React.Component {
  render() {
    let glow = '';
    let pressStartNight = '';
    if (this.props.timeOfDay === 'midnight' || this.props.timeOfDay === 'night') {
      glow = 'glow';
      pressStartNight = 'press-start-night';
    }
    return (
      <div className="main-background"
        style={{ backgroundImage: `url(assets/images/${this.props.timeOfDay}-bg.gif)` }}>
        <div className="pokefit-logo">
          <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
        </div>
        <div onClick={() => {
          this.props.setView('home');
          this.props.getCurrentPosition();
          this.props.getStartPosition();
        }} className={`press-start ${pressStartNight}`}>PRESS START</div>
        <div className='start-sprites-container'>
          <div className={`pikachu-sprite-container ${glow}`} />
          <div className={`ash-sprite-container ${glow}`} />
        </div>
      </div>
    );
  }
}
