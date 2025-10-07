const mongo = require("mongoose");


const product = new mongo.Schema(
    {
        title: {
            type: String,
            required: true
        },
        productDetails: {
            type: String,
            required: true
        },
        features: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        productImage:
        {
            type:String
        }
    },
    {
        timestamps: true
    }
);

const NewProduct = mongo.model('product', product);

module.exports = NewProduct;