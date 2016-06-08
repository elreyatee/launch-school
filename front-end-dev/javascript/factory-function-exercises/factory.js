function createInvoices(services) {
  var services = services || {};

  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    total: function() {
      return (this.phone + this.internet);
    }
  };
}

function invoiceTotal(invoices) {
  var total = 0;
  for (var i = 0; i < invoices.length; i++) {
    total += invoices[i].total();
  }
  return total;
}
