import React from 'react';

export default class Pokebox extends React.Component {
  render() {
    return (
      <div>
        <h1>Pokebox</h1>
        <button onClick={() => this.props.setView('home')}>HomePage</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
