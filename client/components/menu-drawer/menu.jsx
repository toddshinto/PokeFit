import React from 'react';
import MenuAction from './menu-action';
import { AppContext } from '../app-context';

export default class Menu extends React.Component {
  render() {
    let menu = 'menu';
    let menuTriangle = 'menu-triangle';
    let rename = 'menu-drawer-item';
    let release = 'menu-drawer-item';
    if (this.context.opened) {
      menu = 'menu-opened';
      menuTriangle = 'menu-triangle-opened';
    }
    if (this.context.action === 'rename') {
      rename = 'menu-drawer-item-selected';
    }
    if (this.context.action === 'release') {
      release = 'menu-drawer-item-selected';
    }
    if (this.context.timeOfDay === 'midnight' || this.context.timeOfDay === 'night') {
      menu = 'menu-night';
      menuTriangle = 'menu-triangle-opened';
      if (this.context.opened) {
        menu = 'menu-night-opened';
        menuTriangle = 'menu-triangle';
      }
    }
    return (
      <>
        <div className={menu} onClick={() => {
          this.context.openDrawer();
          if (this.context.action) {
            this.context.setAction(null);
          }
        }}>
          Menu
          <div className={menuTriangle}>
          </div></div>
        {this.context.opened
          ? (
            <div className='menu-drawer'>
              <div className={rename} onClick={() => this.context.setAction('rename')}>Rename</div>
              <div className={release} onClick={() => this.context.setAction('release')}>Release</div>
            </div>
          )
          : <></>}
        {this.context.action ? <MenuAction /> : <></>}
      </>
    );
  }
}

Menu.contextType = AppContext;
