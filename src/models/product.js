import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    price: { 
        type: String,
        required: true 
    },
    category:{
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    review: {
        type: String,
    },
});
const Product = mongoose.model('product', productSchema)
export default Product;