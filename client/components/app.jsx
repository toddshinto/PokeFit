import React from 'react';
import HomePage from './home-page';
import Start from './start';
import Backpack from './backpack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'start'
    };
    this.setView = this.setView.bind(this);

  }

  setView(view) {
    this.setState({ view: view });
  }

  render() {
    let display = null;
    switch (this.state.view) {
      case 'home':
        display = <HomePage setView={this.setView} />;
        break;
      case 'start':
        display = <Start setView={this.setView} />;
        break;
      case 'backpack':
        display = <Backpack setView={this.setView} />;
        break;
    }
    return (
      display
    );
  }
}
