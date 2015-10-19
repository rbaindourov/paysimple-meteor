
  let crypto = Npm.require('crypto')

  Meteor.startup( () => {

      //Meteor.setInterval( ()=>{

        let dateTime = new Date();
        let iso =  dateTime.toISOString();
        let hmac = crypto.createHmac('sha256', Meteor.settings.paysimple.secret).update(new Buffer( iso ).toString() ).digest('base64')

        let headers = {
          'Authorization': `PSSERVER AccessId = ${Meteor.settings.paysimple.username}; Timestamp = ${iso}; Signature = ${hmac}`
        }

        let present = new moment();
        let startdate =  present.subtract(30,'days').utc().format();
        let uri  = `${Meteor.settings.paysimple.url}/v4/payment?startdate=?${startdate}`
        console.log( uri );

        HTTP.call( "GET", uri, {headers}, ( err, result )=>{
          //TODO: page through large dataset
          let data =  result['data'];

          data['Response'].forEach( (item) => {
              console.log( JSON.stringify( item ) );
              Payments.update( {Id:item.Id}, {$set:item}, {upsert:true} );
          })
          data['Response']=null;
          console.log( data );
        });

      //}, 1000)

  });



Router.route('/csv', {
  where: 'server',
  action: function () {

    let filename = 'settled_transactions.csv';
    let fileData = "";

    let headers = {
      'Content-type': 'text/csv',
      'Content-Disposition': `attachment; filename=${filename}`
    }

    let records = Payments.find({Status:"Settled"});

    fileData += `TransactionId,CustomerId,CustomerFirstName,CustomerLastName,CustomerCompany,Status,Amount,CreatedOn,LastModified\r\n`;
    records.forEach(function(rec) {
      fileData += `${rec.Id},${rec.CustomerId},${rec.CustomerFirstName},${rec.CustomerLastName},${rec.CustomerCompany},${rec.Status},${rec.Amount},${rec.CreatedOn},${rec.LastModified}\r\n`;
    });
    this.response.writeHead(200, headers);
    return this.response.end(fileData);
  },

});
