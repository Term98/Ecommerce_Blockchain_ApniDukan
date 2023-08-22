const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51K9R6lSINmMx78lgyefKAdY6R0wlqw6WwP1pFAonq09i2OFmEnIC3KmP7JMEZ1MZTRejpLm6gJxMWw9XF9osgm7A003RvyTOoJ"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  // console.log("secret key ", process.env.STRIPE_SECRET_KEY);
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    // console.log("myPayment", myPayment);
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    // console.log("error", error);
  }
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
