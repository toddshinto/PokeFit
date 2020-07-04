import React from 'react';
import { AppContext } from '../app-context';

export default class ReleaseSuccess extends React.Component {
  render() {
    return (
      <div className='action-modal'>
        <div className='action-content'>
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className='action-header green-bg'>Success</div>
          <div className='action-body action-body-message' onClick={() => {
            this.context.closeDrawer();
            this.context.setAction(null);
            this.context.setPokemonDetails(0);
          }}>
            <div className='action-body-message'>{'Okay... Bye-bye '}<span className="to-uppercase">{this.context.pokemonDetails.name}!</span>{'\n  See you around...'}</div>
          </div>
        </div>
      </div>
    );
  }
}

ReleaseSuccess.contextType = AppContext;
