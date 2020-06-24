import React from 'react';

export default class Walk extends React.Component {
  render() {
    return (
      <div>
        <h1>Walk Screen</h1>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>

      </div>
    );
  }
}
