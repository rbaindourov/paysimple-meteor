
  Meteor.startup( () => {
      console.log( 'startup');

      Meteor.setInterval( ()=>{
        console.log( 'polling paysimple');
        /*
        request.get('', (err, response, body)=>{
          console.log(err, response, body );
        });
        */
      }, 50000)
  });
