const product = require("../models/product");


//showing all product
async function AllItems(req, res) {

    let alldata = await product.find({})

    
    res.render("home", { products: alldata });

    
}


module.exports = 
    {
    
        AllItems
    }
