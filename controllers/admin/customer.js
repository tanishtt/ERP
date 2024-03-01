const connection = require('../../connection/connection');

// Controller to get total, weekly, monthly, and daily customer counts
function getCustomerCounts(req, res) {
    // Total customers query
    connection.query('SELECT COUNT(DISTINCT customer_id) AS total_customers FROM Orders', (err, totalResult) => {
        if (err) {
            console.error('Error fetching total customers:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const totalCustomers = totalResult[0].total_customers;

        // Weekly customers query
        connection.query('SELECT COUNT(DISTINCT customer_id) AS weekly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
            if (err) {
                console.error('Error fetching weekly customers:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const weeklyCustomers = weeklyResult[0].weekly_customers;

            // Monthly customers query
            connection.query(`SELECT COUNT(DISTINCT customer_id) AS monthly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) = MONTH(CURDATE())`, (err, monthlyResult) => {
                if (err) {
                    console.error('Error fetching monthly customers:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const monthlyCustomers = monthlyResult[0].monthly_customers;

                // Daily customers query
                connection.query('SELECT COUNT(DISTINCT customer_id) AS daily_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
                    if (err) {
                        console.error('Error fetching daily customers:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    const dailyCustomers = dailyResult[0].daily_customers;

                    // Send all counts in JSON response
                    res.status(200).json({
                        total_customers: totalCustomers,
                        weekly_customers: weeklyCustomers,
                        monthly_customers: monthlyCustomers,
                        daily_customers: dailyCustomers
                    });
                });
            });
        });
    });
}


function getAllCustomers(req, res){
    const query='select * from customers';
    connection.query(query,(err, results)=>{
        if (err) {
                console.error('Error fetching daily customers:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

        return res.status(200).json({
            customers:results
        })
    })
}
module.exports = {
    getCustomerCounts,
    getAllCustomers
};
