// Task component - represents a single todo item
LineItem = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.item.Id}</td>
        <td>{this.props.item.CustomerId}</td>
        <td>{this.props.item.CustomerFirstName}</td>
        <td>{this.props.item.CustomerLastName}</td>
        <td>{this.props.item.CustomerCompany}</td>
        <td>{this.props.item.Status}</td>
        <td>{this.props.item.Amount}</td>
        <td>{this.props.item.CreatedOn}</td>
        <td>{this.props.item.LastModified}</td>
      </tr>
    );
  }
});
