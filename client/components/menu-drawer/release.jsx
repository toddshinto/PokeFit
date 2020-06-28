import React from 'react';

export default class Release extends React.Component {
  render() {
    return (
      <div className='action-modal'>
        <div className='action-content'>
          <div>Are you sure?</div>
          <div onClick={this.props.releasePokemon}>
          YES</div>
          <div onClick={() => {
            this.props.setAction(null);
            this.props.closeDrawer();
          }}>NO</div>
        </div>
      </div>
    );
  }
}
