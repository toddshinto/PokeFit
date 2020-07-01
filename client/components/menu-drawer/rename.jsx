import React from 'react';

export default class Rename extends React.Component {
  render() {
    return (
      <div className="action-modal">
        <div className="action-contents">
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className="action-header" style={{ backgroundColor: 'rgb(51, 172, 251)', color: 'white' }}>Name your Pokémon:</div>
          <div className="exit-sm"
            onClick={() => {
              this.props.setAction(null);
              this.props.closeDrawer();
            }}>X</div>
          <form
            className = "action-body"
            style={{ marginTop: '10px' }}
            spellCheck={false}
            onSubmit={this.props.handleSubmit}>
            <input
              type="text"
              defaultValue={this.props.pokemonName}
              onChange={this.props.handleNameChange}
              className="pokemon-rename"
            />
            <button className='rename-enter' type='submit'>ENTER</button>
          </form>
        </div>
      </div>
    );
  }
}
