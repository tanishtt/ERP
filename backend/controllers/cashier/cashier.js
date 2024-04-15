const connection = require('../../connection/connection');


async function handleCashierPage(req, res){

}

async function handleAddNewItem(req, res){

}

async function handleConfirmOrder(req, res){

}


//get products in search bar.
async function getProducts(req, res) {
    try {
        const ProductDetails = `SELECT * FROM products`;
        connection.query(ProductDetails, (err, result) => {
            if (err) {
                console.error('Error fetching product details:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log(result);
            return res.json(result);
        });
    } catch (error) {
        console.error('Error in getProducts function:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


// Controller to get product by ID
async function getProductById(req, res) {
    const productId = req.params.productId;
    const query = `SELECT * FROM products WHERE product_id = ?`;
    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error fetching product by ID:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(result[0]); // Assuming there's only one product with the given ID
    });
}


async function getAllCustomers (req, res) {
    try {
        const CustomerDetails = `SELECT * FROM customers`;
        connection.query(CustomerDetails, (err, result) => {
            if (err) {
                console.error('error in getting result', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.json(result);
        })
    }
    catch (error) {
        console.error('Error in getAllCustomers function:', error);
        return res.status(500).json({ error: 'Internal server error' })
    }
}            




module.exports={
    handleCashierPage,
    handleAddNewItem,
    handleConfirmOrder,
    getProducts,
    getProductById,
    getAllCustomers
}