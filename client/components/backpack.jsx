import React from 'react';
import ItemDetails from './item-details';
import ItemListItem from './item-list-item';
import { AppContext } from './app-context';

export default class Backpack extends React.Component {
  render() {
    const items = this.context.items;
    return (
      <div className="pokedex-body">
        <ItemDetails />
        <div className="pokedex-screen-container">
          <div className="pokedex-rectangle-screen">
            <div className="pokedex-headline">BACKPACK</div>
            <div className="backpack-list to-uppercase">
              {items.length > 0
                ? items.map(item =>
                  <ItemListItem
                    number={items.indexOf(item)}
                    key={items.indexOf(item)}
                    item={item}
                  />
                )
                : <div style={{ marginTop: '10px' }}>NO ITEMS FOUND:(</div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Backpack.contextType = AppContext;
