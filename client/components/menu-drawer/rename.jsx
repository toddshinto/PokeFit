import React from 'react';
import { AppContext } from '../app-context';

export default class Rename extends React.Component {
  render() {
    return (
      <div className="action-modal">
        <div className="action-contents">
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className="action-header green-bg">Name your Pokémon:</div>
          <div className="exit-sm"
            onClick={() => {
              this.context.setAction(null);
              this.context.closeDrawer();
            }}>X</div>
          <form
            className = "action-body"
            style={{ marginTop: '10px' }}
            spellCheck={false}
            onSubmit={this.props.handleSubmit}>
            <input
              type="text"
              onChange={this.props.handleNameChange}
              value={this.props.rename}
              className="pokemon-rename to-uppercase"
              maxLength="12"
            />
            <button className='modal-button answer green-bg' type='submit' style={{ padding: '2px 2px 2px 5px' }}>ENTER</button>
          </form>
        </div>
      </div>
    );
  }
}

Rename.contextType = AppContext;
