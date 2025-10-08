const product = require("../models/product");
 const multer  = require('multer')
 const upload = require("../util/multer")


// creating products on DB
async function Addproduct(req, res) {
    try {
        let data = req.body;
        
        // With Cloudinary, req.file.path will be the Cloudinary URL
        const pic = req.file.path; // This is now the Cloudinary URL
        
        const newitem = await product.create({
            title: data.title,
            productDetails: data.productDetails,
            features: data.features,
            price: data.price,
            productImage: pic // Store the Cloudinary URL
        });

        console.log("Product created successfully:", newitem);
        res.render("uploadedDone");
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Error creating product");
    }
}
// This function is no longer needed as Cloudinary handles uploads automatically
//showing only selected product
async function SelectedItem(req,res) {

    let item = await product.findById(req.params.id);
  
   
    
    res.render("productInfo", {product: item});
}

//showing all product
async function AllItems(req, res) {

    let alldata = await product.find({})

    
    res.render("home", { products: alldata });

    
}
async function redirectToProductPage(req,res) {

    res.render("uploadProduct")
    
}

module.exports = 
    {
        Addproduct,
        SelectedItem,
        AllItems,
        redirectToProductPage
    }
