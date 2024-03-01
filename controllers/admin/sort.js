const connection = require('../../connection/connection');

async function handleSortByDate(req, res) {
    try {
        const { order } = req.query;
        let sortOrder = 'ASC';
        if (order && order.toLowerCase() === 'desc') {
            sortOrder = 'DESC';
        }

        const query = `SELECT * FROM products ORDER BY last_updated ${sortOrder}`;


        const products = await connection.query(query);

        res.status(200).json({ sorted_products: products });


    } catch (error) {
        console.error('Error sorting products by date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function handleSortByName(req, res) {
    try {
        const { order } = req.query;
        let sortOrder = 'ASC';
        if (order && order.toLowerCase() === 'desc') {
            sortOrder = 'DESC';
        }


        const query = `SELECT * FROM products ORDER BY product_name ${sortOrder}`;
        const products = await connection.query(query);

        res.status(200).json({ sorted_products: products });

    } catch (error) {
        console.error('Error sorting products by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = {
    handleSortByDate,
    handleSortByName
};
