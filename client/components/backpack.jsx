import React from 'react';
import ItemDetails from './item-details';
import ListItem from './item-list-item';

export default class Backpack extends React.Component {
  render() {
    console.log(this.state);
    const items = this.props.items;
    return (
      <div className="pokebox-body">
        <ItemDetails
          timeOfDay={this.props.timeOfDay}
          backgroundImage={this.props.backgroundImage}
          item={this.props.itemDetails} />
        <div className="pokebox-screen-container">
          <div className="pokebox-rectangle-screen">
            <div className="pokebox-headline">
              BACKPACK
            </div>
            <div className="pokemon-list">
              {items.length > 1
                ? items.map(item =>
                  <ListItem
                    number={items.indexOf(item)}
                    key={items.indexOf(item)}
                    item={item}
                    setItemDetails={this.props.setItemDetails}
                  />
                )
                : <div>No items Found :(</div>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
