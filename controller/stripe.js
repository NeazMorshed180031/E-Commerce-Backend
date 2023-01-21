const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/user");
const Coupon = require("../models/user");
const stripe = require("stripe")(
  "sk_test_51KkODSSGu2M5B5BeBQTD8FscGhrxmj0ztRjA2fJLeN0xU13X2w5rfbIlJjDWTTa00kQGlbX1qgKgv8OMmAptmcQ200z94rq3tM"
);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // later calculate price

  const { couponApplied } = req.body;

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  console.log("ufjfg", user._id);

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();

  console.log(
    "CART TOTAL CHARGED",
    cartTotal,
    "totalAfterDiscount ",
    totalAfterDiscount
  );
  let originalAmount = 0;
  if (couponApplied && totalAfterDiscount) {
    originalAmount = totalAfterDiscount * 100;
  } else {
    originalAmount = cartTotal * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: originalAmount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: originalAmount,
  });
};
