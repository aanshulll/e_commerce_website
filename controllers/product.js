const product = require("../models/product");
 const multer  = require('multer')
 const upload = require("../util/multer")


// creating products on DB
async function  Addproduct(req,res) {

    let data = req.body // Fixed typo
     const pic = `/uploads/${req.file.filename}`;
    const newitem =  await product.create(
        {
            title: data.title,
            productDetails: data.productDetails,
            features: data.features,
            price: data.price,
            productImage:pic
        }
    )

   

    console.log(newitem);

    res.render("uploadedDone")
  
    
}
function uploadImage() {
    upload.single('productImage'), function (req, res) {
  const pic = `/uploads/${req.file.filename}`;
 
  
    }
}
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
        redirectToProductPage,
        uploadImage
    }
