const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title:{
        type: String,
    }, 
    description:{
        type: String,
    },
    price:{
        type: Number,
    }, 
    discountPercentage:{
        type: Number,
    }, 
    rating:{    
        type: Number,
    }, 
    stock:{
        type: Number,
    },
    brand: {
        type: String,
    }, 
    
    category: { 
        type: String, required: true 
    },
    thumbnail:{ 
        type: String,
    },
    images:{ 
        type: [String],
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("Product",ProductSchema)