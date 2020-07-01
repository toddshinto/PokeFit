import React from 'react';

export default class PokeballListItem extends React.Component {
  render() {
    const item = this.props.item;
    if (item.type === 'berry' || item.quantity < 1) {
      return <></>;
    } else {
      return (
        <div
          className="pokeball-list-item list-item to-uppercase item-row"
          onClick={() => this.props.throwBall(item)}>
          <div
            className="pokeball-list-item-image item-number"
            style={{ backgroundImage: `url(${item.sprite})` }} />
          <div className="backpack-item-entry">
            <div className='backpack-item-name'>{item.name}</div>
            <div className='backpack-item-quantity' style={{ textTransform: 'lowercase' }}>x{item.quantity}</div>
          </div>
        </div>
      );
    }
  }
}
