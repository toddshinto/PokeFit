import React from 'react';

export default class Rename extends React.Component {
  render() {
    return (
      <div>
        <div>Name your Pokémon:</div>
        <form onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            defaultValue={this.props.pokemonName}
            onChange={this.props.handleNameChange}
          />
          <button type='submit'>ENTER</button>
        </form>
      </div>
    );
  }
}
