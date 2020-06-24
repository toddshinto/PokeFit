import React from 'react';

export default class Backpack extends React.Component {
  render() {
    return (
      <div>
        <h1>BackPack</h1>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
      </div>
    );
  }
}
