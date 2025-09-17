const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
    price: Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String,
    stock: { // Add stock field
        type: Number,
        default: 10 // Default stock quantity
    }
});

module.exports = mongoose.model("product", productSchema);