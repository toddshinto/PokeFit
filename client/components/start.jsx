import React from 'react';

export default class Start extends React.Component {
  render() {
    return (
      <>
        <div className="main-background"></div>
        <div onClick={() => this.props.setView('home')} className="press-start">PRESS START</div>
        <div>
          <img src="/assets/images/great-ball.png" alt="8 bit Ash from pokemon" className="ash-sprite" />
        </div>
        <div className="pokefit-logo">
          <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
        </div>
      </>
    );
  }
}
