// Task component - represents a single todo item
LineItem = React.createClass({
  render() {
    return (
      <li>{this.props.item.Id}</li>
    );
  }
});
