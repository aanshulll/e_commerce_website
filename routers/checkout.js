const express = require("express")
const product = require("../models/product")
const user = require("../models/users")
const upload = require("../util/multer");


const { checkAuth } = require("../middlewares/authCookie"); // import middleware function
const router = express.Router();

router.get("/:id", checkAuth, async (req, res) => {
  try {
    const item = await product.findById(req.params.id);
    const userData = await user.findOne({ email: req.user.email });

    console.log("User data:", userData);

    res.render("checkout", { product: item, user: userData });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/checkout", (req, res) =>
{
   res.send("Order Placed Successfully")
})

module.exports = router;
