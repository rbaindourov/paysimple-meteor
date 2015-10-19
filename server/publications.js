Meteor.publish('payments', function () {
  return Payments.find({Status:"Settled"});
});
