import React from 'react';
import Rename from './rename';
import RenameSuccess from './rename-success';
import Release from './release';
import ReleaseSuccess from './release-success';

export default class MenuAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rename: '',
      pokemon: null
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.releasePokemon = this.releasePokemon.bind(this);
  }

  componentDidMount() {
    this.setState({ pokemon: this.context.pokemonDetails, rename: this.context.pokemonDetails.name });
  }

  handleNameChange(event) {
    const value = event.target.value.replace(/[^A-z0-9]/ig, '');
    this.setState({ rename: value });
  }

  handleSubmit() {
    const renamedPokemon = this.state.pokemon;
    renamedPokemon.name = this.state.rename;
    event.preventDefault();
    fetch('/api/pokeboxes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(renamedPokemon)
    })
      .then(res => res.json())
      .then(response => {
        this.context.setAction('renameSuccess');
      });
    this.context.setView('pokebox');
  }

  releasePokemon() {
    const pokemon = this.state.pokemon;
    fetch('/api/pokeboxes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
      .then(res => res.json())
      .then(response => {
        this.context.setAction('releaseSuccess');
        this.context.getPokemon();
        this.context.setView('pokebox');
      });
  }

  render() {
    let screen;
    switch (this.props.action) {
      case 'rename' :
        screen = <Rename
          handleSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          rename={this.state.rename} />;
        break;
      case 'release':
        screen = <Release
          releasePokemon={this.releasePokemon} />;
        break;
      case 'renameSuccess' :
        screen = <RenameSuccess
          pokemonNew={this.state.rename}/>;
        break;
      case 'releaseSuccess' :
        screen = <ReleaseSuccess />;
        break;
      default:
        screen = <></>;
    }
    if (this.props.action) {
      return (
        <div>
          {screen}
        </div>
      );
    }
    return <></>;
  }
}
