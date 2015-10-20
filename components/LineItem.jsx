// Task component - represents a single todo item
LineItem = React.createClass({
  render() {
    return (
      <tr>
        <td className="center">{this.props.item.Id}</td>
        <td className="center">{this.props.item.CustomerId}</td>
        <td className="left">{this.props.item.CustomerFirstName}</td>
        <td className="left">{this.props.item.CustomerLastName}</td>
        <td className="left">{this.props.item.CustomerCompany}</td>
        <td className="left">{this.props.item.Status}</td>
        <td>{this.props.item.Amount}</td>
        <td>{this.props.item.CreatedOn}</td>
        <td>{this.props.item.LastModified}</td>
      </tr>
    );
  }
});
