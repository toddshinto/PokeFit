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
    return (
      <>
        <div onClick={this.openDrawer}>Menu</div>
        {this.state.opened
          ? (
            <div>
              <div onClick={() => this.setAction('rename')}>Rename</div>
              <div onClick={() => this.setAction('release')}>Release</div>
            </div>
          )
          : <></>}
        {this.state.action ? <MenuAction action={this.state.action} pokemon={this.props.pokemon} closeDrawer={this.closeDrawer} setAction={this.setAction}/> : <></>}
      </>
    );
  }
}
