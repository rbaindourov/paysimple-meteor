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


  renderTasks() {
    return this.data.records.map(( item ) => {

      return <LineItem key={item.Id} item={item} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Settled Transcations</h1>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
