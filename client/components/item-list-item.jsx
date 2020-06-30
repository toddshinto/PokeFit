import React from 'react';

export default class itemListItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <div className="item-list-item" onClick={() => this.props.setitemDetails(this.props.number)}>
        <span>{(this.props.number + 1)}. </span>
        {item.name}
      </div>
    );
  }
}
