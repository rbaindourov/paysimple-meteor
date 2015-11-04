
  let crypto = Npm.require('crypto')

  const generateHeader = () => {

    let dateTime = new Date();
    let iso =  dateTime.toISOString();
    let hmac = crypto.createHmac('sha256', Meteor.settings.paysimple.secret).update(new Buffer( iso ).toString() ).digest('base64')

    return {
      'Authorization': `PSSERVER AccessId = ${Meteor.settings.paysimple.username}; Timestamp = ${iso}; Signature = ${hmac}`
    }

  }

  Meteor.startup( () => {
      console.log('Metoer Server Startup')
      //Meteor.setInterval( ()=>{
        let headers = generateHeader();
        let present = new moment();
        let startdate =  present.subtract(30,'days').utc().format();
        let uri  = `${Meteor.settings.paysimple.url}/v4/payment?startdate=?${startdate}`

        HTTP.call( "GET", uri, {headers}, ( err, result )=>{
          //TODO: page through large dataset
          let data =  result['data'];


          data['Response'].forEach( (item) => {
              Payments.update( {Id:item.Id}, {$set:item}, {upsert:true} );

              customer = Customers.find({Id:item.CustomerId}).fetch();
              console.log( 'customer: ', customer.length );

              if( customer.length == 0 ){


                let headers = generateHeader();
                HTTP.call("GET", `${Meteor.settings.paysimple.url}/v4/customer/${item.CustomerId}`, {headers},(custErr, custResult) => {

                  if( custErr ) {
                    console.error( 'error', custErr )
                    process.exit(1);
                  }

                  let customerData =  custResult['data'];
                  Customers.insert( customerData['Response'] );

                })


              }



          })

        });

      //}, 1000 * 60 * 60 * 6)

  });
