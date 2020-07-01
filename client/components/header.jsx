import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='pokedex-header'>
        <div className="triangle-button"
          onClick={() => {
            this.props.setView('home');
            this.props.resetState();
          }
          }/>
        <div className="right-side-buttons">
          <div className="button yellow-circle-button" />
          <div className="button green-circle-button" />
          <div className="button outer-white-circle">
            <div className="inner-blue-circle" />
          </div>
        </div>
      </div>
    );
  }
}
