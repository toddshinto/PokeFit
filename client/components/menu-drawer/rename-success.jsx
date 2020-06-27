import React from 'react';

export default class RenameSuccess extends React.Component {
  render() {
    return (
      <div onClick={() => {
        this.props.setAction(null);
        this.props.closeDrawer();
      }}>
        <div>Success!</div>
        <div>{`Your Pokémon is now named ${this.props.pokemonNew}`}</div>
      </div>
    );
  }
}
