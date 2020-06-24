import React from 'react';

export default class HomePage extends React.Component {

  render() {
    return (
      <div>
        <h1 onClick={() => this.props.setView('start')}>Home Page</h1>
      </div>
    );
  }
}
