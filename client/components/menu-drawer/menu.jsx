import React from 'react';
import MenuAction from './menu-action';

export default class Menu extends React.Component {
  render() {
    let menu = 'menu';
    let menuTriangle = 'menu-triangle';
    let rename = 'menu-drawer-item';
    let release = 'menu-drawer-item';
    if (this.props.opened) {
      menu = 'menu-opened';
      menuTriangle = 'menu-triangle-opened';
    }
    if (this.props.action === 'rename') {
      rename = 'menu-drawer-item-selected';
    }
    if (this.props.action === 'release') {
      release = 'menu-drawer-item-selected';
    }
    if (this.props.timeOfDay === 'midnight' || this.props.timeOfDay === 'night') {
      menu = 'menu-night';
      menuTriangle = 'menu-triangle-opened';
      if (this.props.opened) {
        menu = 'menu-night-opened';
        menuTriangle = 'menu-triangle';
      }
    }
    return (
      <>
        <div className={menu} onClick={() => {
          this.props.openDrawer();
          if (this.props.action) {
            this.props.setAction(null);
          }
        }}>
          Menu
          <div className={menuTriangle}>
          </div></div>
        {this.props.opened
          ? (
            <div className='menu-drawer'>
              <div className={rename} onClick={() => this.props.setAction('rename')}>Rename</div>
              <div className={release} onClick={() => this.props.setAction('release')}>Release</div>
            </div>
          )
          : <></>}
        {this.props.action ? <MenuAction getPokemon={this.props.getPokemon} action={this.props.action} pokemon={this.props.pokemon} closeDrawer={this.props.closeDrawer} setAction={this.props.setAction} setPokemonDetails={this.props.setPokemonDetails} setView={this.props.setView}/> : <></>}
      </>
    );
  }
}
