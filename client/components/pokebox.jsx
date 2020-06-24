import React from 'react';

export default class Pokebox extends React.Component {
  render() {
    return (
      <div>
        <h1>Pokebox</h1>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
