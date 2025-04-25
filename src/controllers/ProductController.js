import Product from '../models/product.js'

async function getProducts(req, res) {
    try {
        const products = await Product.find();
        console.log("getProducts function called");
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving products',
            error: error.message
        });
    }
};

async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findById({ id: productId })
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving products',
            error: error.message
        });
    }
}

export {
    getProducts,
    getProductById
}
