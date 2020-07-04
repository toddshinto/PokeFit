import React from 'react';
import { AppContext } from '../app-context';

export default class Release extends React.Component {
  render() {
    return (
      <div className='action-modal'>
        <div className='action-content'>
          <div className='pokeball-icon-small top-left-small' />
          <div className="pokeball-icon-small top-right-small" />
          <div className="pokeball-icon-small bottom-left-small" />
          <div className="pokeball-icon-small bottom-right-small" />
          <div className='action-header red-bg' style={{ borderBottom: '2px solid black' }}>{'Are you sure?'}</div>
          <div className="exit-sm"
            onClick={() => {
              this.context.setAction(null);
              this.context.closeDrawer();
            }}>X</div>
          <div className='action-body action-body-message'>
            {'Your POKéMON will be released...'}
            <div className='action-yes-no'>
              <div className='answer modal-button green-bg' onClick={() => this.props.releasePokemon()}>YES</div>
              <div className='answer modal-button red-bg' onClick={() => {
                this.context.setAction(null);
                this.context.closeDrawer();
              }}>NO</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Release.contextType = AppContext;
