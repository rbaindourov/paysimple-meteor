
  let crypto = Npm.require('crypto')

  Meteor.startup( () => {
      console.log( 'startup');

      Meteor.setInterval( ()=>{

        let iso =  new Date().toISOString()
        let hmac = crypto.createHmac('sha256', Meteor.settings.paysimple.secret).update(new Buffer( iso ).toString() ).digest('base64')

        let headers = {
          'Authorization': `PSSERVER AccessId = ${Meteor.settings.paysimple.username}; Timestamp = ${iso}; Signature = ${hmac}`
        }

        request.get({url:Meteor.settings.paysimple.url, strictSSL:false, headers:headers}, (err, response, body)=>{
          console.log( body );
        });

      }, 5000)

  });
