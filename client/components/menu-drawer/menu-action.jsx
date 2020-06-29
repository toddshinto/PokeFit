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
    this.setState({ pokemon: this.props.pokemon });
  }

  handleNameChange(event) {
    this.setState({ rename: event.target.value });
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
        this.props.setAction('renameSuccess');
      });
    this.props.setView('pokebox');
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
        this.props.setAction('releaseSuccess');
      });
  }

  render() {
    let screen;
    switch (this.props.action) {
      case 'rename' :
        screen = <Rename
          handleSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          closeDrawer={this.props.closeDrawer}
          setAction={this.props.setAction}
          pokemonName={this.props.pokemon.name} />;
        break;
      case 'release':
        screen = <Release
          setAction={this.props.setAction}
          releasePokemon={this.releasePokemon}
          closeDrawer={this.props.closeDrawer}
          pokemon={this.state.pokemon}/>;
        break;
      case 'renameSuccess' :
        screen = <RenameSuccess
          setAction={this.props.setAction}
          closeDrawer={this.props.closeDrawer}
          pokemonOld={this.props.pokemon.name}
          pokemonNew={this.state.rename}/>;
        break;
      case 'releaseSuccess' :
        screen = <ReleaseSuccess
          setAction={this.props.setAction}
          pokemon={this.props.pokemon.name}
          setPokemonDetails={this.props.setPokemonDetails}
          closeDrawer={this.props.closeDrawer}/>;
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
