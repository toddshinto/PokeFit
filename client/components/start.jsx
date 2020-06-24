import React from 'react';

export default class Start extends React.Component {
  render() {
    return (
      <div>
        <h1 onClick={() => this.props.setView('home')}>Start Screen</h1>
      </div>
    );
  }
}
