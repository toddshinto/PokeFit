import React from 'react';
import { AppContext } from './app-context';

export default class Header extends React.Component {
  render() {
    return (
      <div className='pokedex-header'>
        <div className="triangle-button"
          onClick={() => {
            this.context.setView('home');
            this.context.resetState();
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

Header.contextType = AppContext;
