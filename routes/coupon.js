const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middleware/auth");

// controller
const { create, remove, list } = require("../controller/coupon");

// routes
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
