import React from 'react';

export default class RenameSuccess extends React.Component {
  render() {
    return (
      <div className="action-modal">
        <div className="action-contents" onClick={() => {
          this.props.setAction(null);
          this.props.closeDrawer();
        }}>
          <div className="action-header" style={{ backgroundColor: '#64B572' }}>Success!</div>
          <div className="action-body">{`Your Pokémon is now named ${this.props.pokemonNew}`}</div>
        </div>
      </div>
    );
  }
}
