import React from 'react';

export default class ReleaseSuccess extends React.Component {
  render() {
    return (
      <div>
        <div className='action-content' onClick={() => {
          this.props.closeDrawer();
          this.props.setAction(null);
        }}>
          {`Okay... Bye bye ${this.props.pokemon}! See you around...`}
        </div>
      </div>
    );
  }
}
