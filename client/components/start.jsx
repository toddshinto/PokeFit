import React from 'react';

export default class Start extends React.Component {
  render() {
    return (
      <div className="main-background">
        <div className="pokefit-logo">
          <img src="/assets/images/pokefit-shadow.png" alt="pokefit logo" className="pokefit-logo" />
        </div>
        <div onClick={() => this.props.setView('home')} className="press-start">PRESS START</div>
        <div className="ash-sprite-container"></div>
      </div>
    );
  }
}
