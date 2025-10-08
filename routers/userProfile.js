const express = require("express");
const Order = require("../models/orders");
const user = require("../models/users");
const { checkAuth } = require("../middlewares/authCookie"); // import your auth middleware
const router = express.Router();

// Profile route (protected)
router.get("/", checkAuth, async (req, res) => {
  try {
    // If checkAuth already attaches user data
const userData = await user.findOne({ email: req.user.email });

    // Fetch all orders for that user
    const userOrders = await Order.find({ userId: userData._id })
      .populate("productId")
      .sort({ createdAt: -1 });

    res.render("userProfile", {
      user: userData,
      userprofile: userData,
      orders: userOrders,
    });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
