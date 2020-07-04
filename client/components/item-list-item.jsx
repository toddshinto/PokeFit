import React from 'react';
import { AppContext } from './app-context';

export default class ItemListItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className="list-item item-row" onClick={() => this.context.setItemDetails(this.props.number)}>
        <div className="item-number">{`${(this.props.number + 1)}.`}</div>
        <div className="backpack-item-entry">
          <div className="backpack-item-name-flex">
            <div className="icon" style={{ backgroundImage: `url(${item.sprite})` }}></div>
            <div>{item.name}</div>
          </div>
          <div className="backpack-item-quantity" style={{ textTransform: 'lowercase' }}>
            x{item.quantity}
          </div>
        </div>

      </div>
    );
  }
}

ItemListItem.contextType = AppContext;
