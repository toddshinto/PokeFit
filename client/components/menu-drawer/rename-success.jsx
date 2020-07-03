import React from 'react';

export default class RenameSuccess extends React.Component {
  render() {
    return (
      <div className="action-modal">
        <div className="action-contents" onClick={() => {
          this.props.setAction(null);
          this.props.closeDrawer();
        }}>
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className="action-header" style={{ backgroundColor: '#64B572' }}>SUCCESS!</div>
          <div className="action-body action-body-message" style={{ textAlign: 'center' }}>{'YOUR POKéMON IS NOW NAMED'}</div>
          <div className="action-body action-body-message" style={{ textAlign: 'center', marginTop: '-10px' }}>{this.props.pokemonNew}</div>
        </div>
      </div>
    );
  }
}
