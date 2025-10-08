const product = require("../models/product");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Create product with Cloudinary upload
async function Addproduct(req, res) {
    try {
        if (!req.file) return res.status(400).send("No file uploaded");

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "ecommerce-products",
            transformation: [{ width: 500, height: 500, crop: "limit" }]
        });

        // Optional: remove local file
        fs.unlinkSync(req.file.path);

        // Save product in DB
        const data = req.body;
        const newItem = await product.create({
            title: data.title,
            productDetails: data.productDetails,
            features: data.features,
            price: data.price,
            productImage: result.secure_url
        });

        console.log("Product created:", newItem);
        res.render("uploadedDone");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating product");
    }
}

async function SelectedItem(req, res) {
    const item = await product.findById(req.params.id);
    res.render("productInfo", { product: item });
}

async function AllItems(req, res) {
    const alldata = await product.find({});
    res.render("home", { products: alldata });
}

async function redirectToProductPage(req, res) {
    res.render("uploadProduct");
}

module.exports = { Addproduct, SelectedItem, AllItems, redirectToProductPage };
