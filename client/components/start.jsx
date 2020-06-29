import React from 'react';

export default class Start extends React.Component {
  render() {
    let glow = '';
    let glowText = '';
    if (this.props.timeOfDay === 'midnight' || this.props.timeOfDay === 'night') {
      glow = 'glow';
      glowText = 'glow-text';
    }
    return (
      <div className="main-background"
        style={{ backgroundImage: `url(${this.props.backgroundImage}` }}>
        <div className="pokefit-logo">
          <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
        </div>
        <div onClick={() => {
          this.props.setView('home');
          this.props.getCurrentPosition();
          this.props.getStartPosition();
        }} className={`press-start ${glowText}`}>PRESS START</div>
        <div className='start-sprites-container'>
          <div className="pikachu-sprite-container" />
          <div className={`ash-sprite-container ${glow}`} />
        </div>
      </div>
    );
  }
}
