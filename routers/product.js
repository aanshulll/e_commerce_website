const express = require("express")
const {SelectedItem,AllItems,Addproduct,redirectToProductPage} = require("../controllers/product");
const upload = require("../util/multer");
const router = express.Router()


router.get("/add-product", redirectToProductPage); // specific route first
router.get("/:id", SelectedItem); // dynamic route last
router.get("/", AllItems);


router.post("/add-product", upload.single('productImage'), Addproduct)

module.exports = router;
