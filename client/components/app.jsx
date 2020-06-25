import React from 'react';
import HomePage from './home-page';
import Start from './start';
import Backpack from './backpack';
import Walk from './walk';
import Pokebox from './pokebox';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      stats: {}
    };
    this.setView = this.setView.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    this.getStats();
  }

  getStats() {
    fetch('/api/users')
      .then(res => res.json())
      .then(stats => this.setState({ stats }))
      .catch(err => console.error(err.message));
  }

  setView(view) {
    this.setState({ view });
  }

  render() {
    let display = null;
    switch (this.state.view) {
      case 'home':
        display = <HomePage stats={this.state.stats} setView={this.setView} />;
        break;
      case 'start':
        display = <Start setView={this.setView} />;
        break;
      case 'backpack':
        display = <Backpack setView={this.setView} />;
        break;
      case 'walk':
        display = <Walk stats={this.state.stats} setView={this.setView} />;
        break;
      case 'pokebox':
        display = <Pokebox setView={this.setView} />;
        break;
    }
    return (
      display
    );
  }
}
