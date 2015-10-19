// App component - represents the whole app


App = React.createClass({

  mixins: [ReactMeteorData],
  templateName: "App",

  getMeteorData: function() {
    try{

      console.log( 'getMeteorData')

      let handle =  Meteor.subscribe("payments");
      let records = Payments.find( {} ).fetch();

      return {
            ready: handle.ready(),
            records: records,
      }

    }catch( e ){
      console.log( 'getMeteorData', e )
    }
  },


  renderTransactions() {
    return this.data.records.map(( item ) => {

      return <LineItem key={item.Id} item={item} />;
    });
  },

  render() {

    return (
      <div className="container">
        <header>
          <h1>Settled Transcations</h1>
          <button className="btn btn-primary"> Download CSV </button>
        </header>

        <table className="table">
          <tr>
            <th>Transaction Id</th>
            <th>CustomerId</th>
            <th>CustomerFirstName</th>
            <th>CustomerLastName</th>
            <th>CustomerCompany</th>
            <th>Status</th>
            <th>Amount</th>
            <th>CreatedOn</th>
            <th>LastModified</th>
          </tr>
          {this.renderTransactions()}
        </table>
      </div>
    );
  }
});
