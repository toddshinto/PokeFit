import React from 'react';

export default class Backpack extends React.Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        <h1>BackPack</h1>
        <ItemDetails pokemon={this.props.itemDetails} />
        <div className="item-list">
          {items.length > 1
            ? items.map(item =>
              <ListItem
                key={items.indexOf(item)}
                item={item}
                setItemDetails={this.props.setItemDetails}
              />
            )
            : <div>No items Found :(</div>
          }
        </div>
        <button onClick={() => this.props.setView('home')} >Home Page</button>
        <button onClick={() => this.props.setView('pokebox')} >Pokebox</button>
        <button onClick={() => this.props.setView('walk')} >Walk Screen</button>
      </div>
    );
  }
}
