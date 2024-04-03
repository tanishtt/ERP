const connection = require('../../connection/connection');



async function handleAddProduct(req, res) {
    try {
        const { product_name, description, price, category_id, stock_quantity } = req.body;
        const last_updated = new Date(); 

        const query = 'INSERT INTO products (product_name, description, price, category_id, stock_quantity, last_updated) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [product_name, description, price, category_id, stock_quantity, last_updated];
        await connection.query(query, values);


        
        res.status(200).json({ message: 'Product added successfully.' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function handleUpdateProduct(req, res) {
    try {
        const { product_name, description, price, category_id, stock_quantity } = req.body;
        const product_id = req.params.product_id; 
        const last_updated = new Date(); 

        const query = 'UPDATE products SET product_name=?, description=?, price=?, category_id=?, stock_quantity=?, last_updated=? WHERE product_id=?';
        const values = [product_name, description, price, category_id, stock_quantity, last_updated, product_id];
        await connection.query(query, values);

        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function handleDeleteProduct(req, res) {
    try {
        const product_id = req.params.product_id; 

        const query = 'DELETE FROM products WHERE product_id=?';
        await connection.query(query, [product_id]);

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function handleGetAllProducts(req, res){
    const query ='select * from products';
    connection.query(query,(err, results)=>{
        if (err) {
                console.error('Error fetching weekly customers:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log(results)
        return res.status(200).json({
            allProducts:results
        })

    })
}



module.exports = {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetAllProducts
};
