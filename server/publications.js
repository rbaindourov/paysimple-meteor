Meteor.publish('payments', function () {
  return Payments.find({});
});
