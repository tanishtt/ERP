const connection = require('../../connection/connection');

// Controller to get total, weekly, monthly, and daily order counts
function getOrderCounts(req, res) {
    // Total orders query
    connection.query('SELECT COUNT(*) AS total_orders FROM Orders', (err, totalResult) => {
        if (err) {
            console.error('Error fetching total orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const totalOrders = totalResult[0].total_orders;

        // Weekly orders query
        connection.query('SELECT COUNT(*) AS weekly_orders FROM Payments WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
            if (err) {
                console.error('Error fetching weekly orders:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const weeklyOrders = weeklyResult[0].weekly_orders;

            // Monthly orders query
            connection.query('SELECT COUNT(*) AS monthly_orders FROM Payments WHERE MONTH(payment_date) = MONTH(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, monthlyResult) => {
                if (err) {
                    console.error('Error fetching monthly orders:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const monthlyOrders = monthlyResult[0].monthly_orders;

                // Daily orders query
                connection.query('SELECT COUNT(*) AS daily_orders FROM Payments WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
                    if (err) {
                        console.error('Error fetching daily orders:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const dailyOrders = dailyResult[0].daily_orders;

                    // Send all counts in JSON response
                    res.status(200).json({
                        total_orders: totalOrders,
                        weekly_orders: weeklyOrders,
                        monthly_orders: monthlyOrders,
                        daily_orders: dailyOrders
                    });
                });
            });
        });
    });
}


function getAllOrders(req, res) {
    const query = `
        SELECT 
            o.order_id,
            c.customer_name,
            p.amount,
            p.payment_date AS order_date
        FROM 
            Orders o
        INNER JOIN 
            Customers c ON o.customer_id = c.customer_id
        INNER JOIN 
            Payments p ON o.order_id = p.order_id
        
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Send the orders data in JSON response
        res.status(200).json(results);
    });
}



module.exports = {
    getOrderCounts,
    getAllOrders
};