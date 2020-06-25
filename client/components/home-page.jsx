import React from 'react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stats: {} };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1 onClick={() => this.props.setView('start')}>Home Page</h1>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
        <button onClick={() => this.props.setView('backpack')} >Backpack</button>
      </div>
    );
  }
}
