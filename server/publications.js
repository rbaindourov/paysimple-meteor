Meteor.publish('payments', function () {
  return Payments.find({Status:"Settled"});
});


Meteor.publish('customers', function () {
  return Customers.find();
});
