import React from 'react';
import MenuAction from './menu-action';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null,
      opened: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.setAction = this.setAction.bind(this);
  }

  openDrawer() {
    this.setState({ opened: true });
  }

  closeDrawer() {
    this.setState({ opened: false });
    this.props.getPokemon();
  }

  setAction(action) {
    this.setState({ action });
  }

  render() {
    let menu = 'menu';
    let menuTriangle = 'menu-triangle';
    let rename = 'menu-drawer-item';
    let release = 'menu-drawer-item';
    if (this.state.opened) {
      menu = 'menu-opened';
      menuTriangle = 'menu-triangle-opened';
    }
    if (this.state.action === 'rename') {
      rename = 'menu-drawer-item-selected';
    }
    if (this.state.action === 'release') {
      release = 'menu-drawer-item-selected';
    }

    return (
      <>
        <div className={menu} onClick={this.openDrawer}>
          Menu
          <div className={menuTriangle}>
          </div></div>
        {this.state.opened
          ? (
            <div className='menu-drawer'>
              <div className={rename} onClick={() => this.setAction('rename')}>Rename</div>
              <div className={release} onClick={() => this.setAction('release')}>Release</div>
            </div>
          )
          : <></>}
        {this.state.action ? <MenuAction action={this.state.action} pokemon={this.props.pokemon} closeDrawer={this.closeDrawer} setAction={this.setAction} setView={this.props.setView}/> : <></>}
      </>
    );
  }
}
