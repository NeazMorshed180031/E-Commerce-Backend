const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middleware/auth");
// controllers
const { userCart,getUserCart,emptyCart,saveAddress,applyCouponToUserCart,createOrder,orders,addToWishlist,wishlist,removeFromWishlist,createCashOrder  } = require("../controller/user");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post('/user/address',authCheck,saveAddress)

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);



router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

router.post("/user/cash-order",authCheck,createCashOrder)
// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
