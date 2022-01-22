// paymentCheckoutController
// const secretKey = process.env.secretKey;
const stripe = require("stripe")(process.env.secretKey);
const uuid = require("uuid").v4;

// payment checkout
module.exports.paymentCheckoutController = (req, res) => {
  // console.log(req.body);
  let error;
  let status;
  const key = uuid();
  const { token, product } = req.body;
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      // have access to the customer object
      return stripe.invoiceItems
        .create({
          customer: customer.id, // set the customer id
          amount: product.price * 100, // 25
          currency: "usd",
          description: "One-time setup fee",
        })
        .then((invoiceItem) => {
          return stripe.invoices.create({
            collection_method: "send_invoice",
            customer: invoiceItem.customer,
          });
        })
        .then((invoice) => {
          // New invoice created on a new customer
          console.log(invoice);
          status = "success";
        })
        .catch((err) => {
          // Deal with an error
          status = "failure";
        });
    });
  return res.json({ status });
};
