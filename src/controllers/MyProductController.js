import Product from "../models/product.js"
import { promises as fs } from 'fs';
import cloudinary from "cloudinary"

const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
    return uploadResponse.url
}

async function createMyProduct(req, res) {
    try {

        const imageUrl = await uploadImage(req.file)

        const productData = {
            ...req.body,
            image: imageUrl
        };

        const newProduct = new Product(productData);
        await newProduct.save();

        res.status(201).json(newProduct.toObject());
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: 'Error create products',
            error: error.message
        });
    }
};

async function updateMyProduct(req, res) {
    try {
        const productId = req.params.id;
        const product = { ...req.body };

        if (req.file) {
            product.image = await uploadImage(req.file);
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            product,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(updatedProduct.toObject());
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
}

async function deleteMyProductController(req, res) {
    try {
        const productId = req.params.id;

        const product = await Product.findOne({ id: productId });
        
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        
        await Product.deleteOne({ id: productId });

        res.status(200).json({
            message: 'Product deleted successfully',
            id: productId
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
}

export {
    createMyProduct,
    updateMyProduct,
    deleteMyProductController
}