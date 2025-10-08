const express = require("express");
const product = require("../models/product");
const user = require("../models/users");
const Order = require("../models/orders");
const upload = require("../util/multer");
const { checkAuth } = require("../middlewares/authCookie");

const router = express.Router();

// ✅ Checkout page (GET)
router.get("/:id", checkAuth, async (req, res) => {
  try {
    const item = await product.findById(req.params.id);
    const userData = await user.findOne({ email: req.user.email });

    if (!item) return res.status(404).send("Product not found");

    res.render("checkout", { product: item, user: userData });
  } catch (err) {
    console.error("Error loading checkout:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Handle order submission (POST)
router.post("/:id", checkAuth, async (req, res) => {
  try {
    const { quantity, deliveryAddress, phoneNumber, productTitle} = req.body;

    const userData = await user.findOne({ email: req.user.email });
    const productData = await product.findById(req.params.id);

    if (!productData) return res.status(404).send("Product not found");

    const totalPrice = productData.price * Number(quantity);

    const newOrder = await Order.create({
      userId: userData._id,
      productId: productData._id,
      productTitle: productData.title,
      quantity,
      totalPrice,
      deliveryAddress,
      phoneNumber,
    });

    console.log("✅ New Order Created:", newOrder);

    res.render("orderSuccess", { user: userData });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
