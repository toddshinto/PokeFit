import React from 'react';

export default class ReleaseSuccess extends React.Component {
  render() {
    return (
      <div className='action-modal'>
        <div className='action-content'>
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className='action-header' style={{ backgroundColor: 'green' }}>Success</div>
          <div className='action-body action-body-message' onClick={() => {
            this.props.closeDrawer();
            this.props.setAction(null);
            this.props.setPokemonDetails(0);
          }}>
            <div className='action-body-message'>{'Okay... Bye-bye '}<span className="to-uppercase">{this.props.pokemon}!</span>{'\n  See you around...'}</div>
          </div>
        </div>
      </div>
    );
  }
}
