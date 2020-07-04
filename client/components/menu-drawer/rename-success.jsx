import React from 'react';
import { AppContext } from '../app-context';

export default class RenameSuccess extends React.Component {
  render() {
    return (
      <div className="action-modal">
        <div className="action-contents" onClick={() => {
          this.context.setAction(null);
          this.context.closeDrawer();
        }}>
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className="action-header green-bg">SUCCESS!</div>
          <div className="action-body action-body-message" style={{ textAlign: 'center' }}>{'YOUR POKéMON IS NOW NAMED'}</div>
          <div className="action-body action-body-message to-uppercase" style={{ textAlign: 'center', marginTop: '-10px' }}>{this.props.pokemonNew}</div>
        </div>
      </div>
    );
  }
}

RenameSuccess.contextType = AppContext;
