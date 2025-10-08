
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    productTitle:
    {
        type: String, required: true
    },
    quantity: { type: Number, required: true, default: 1 },

    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }
},{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;