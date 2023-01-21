const Order = require("../models/order");
const User = require("../models/user");

//orders, orderStatus

exports.orders = async (req, res) => {
  try{
    let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
    console.log("orders",allOrders)

  res.json(allOrders);

  }catch(err){
       console.log('order error',err)
  }

};
exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order
    .findByIdAndUpdate(orderId, { orderStatus }, { new: true })
    .exec();

  res.json(updated);
};
