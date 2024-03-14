const connection = require('../../../connection/connection');



async function getOrderAmountsByYear(req, res) {
    try {
        const query = `
            SELECT YEAR(payment_date) AS year, SUM(amount) AS total_order_amount
            FROM Payments
            GROUP BY YEAR(payment_date)
            ORDER BY YEAR(payment_date)
        `;
        // const query='select * from products';
        const orderAmountsByYear = await connection.query(query,(err, result)=>{
            if(err){console.log('error in getOrderAmountsByYear');return;}
            console.log(result);
            const data = result.map(item => ({
            x: new Date(item.year, 0, 1), // Create a Date object for the year
            y: item.total_order_amount // Total order amount for the year
        }));
            return res.status(200).json({ order_amounts_by_year: data });
        });
        //console.log('Order amounts by year:', orderAmountsByYear);
        // Transform data to match the expected format
        // const data = orderAmountsByYear.map(item => ({
        //     x: new Date(item.year, 0, 1), // Create a Date object for the year
        //     y: item.total_order_amount // Total order amount for the year
        // }));

        //res.status(200).json({ order_amounts_by_year: "data" });
    } catch (error) {
        console.error('Error fetching order amounts by year:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getOrderAmountsByYear
};
