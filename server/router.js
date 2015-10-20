Router.route('/csv', {
  where:'server',
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
