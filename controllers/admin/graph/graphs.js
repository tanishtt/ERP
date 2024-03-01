const connection = require('../../../connection/connection');

async function getMonthlySales(req, res) {
    try {
        const query = `
            SELECT MONTH(payment_date) AS month, YEAR(payment_date) AS year, SUM(amount) AS total_sales
            FROM Payments
            GROUP BY YEAR(payment_date), MONTH(payment_date)
        `;


        const monthlySales = await connection.query(query);

        res.status(200).json({ monthly_sales: monthlySales });
    } catch (error) {
        console.error('Error fetching monthly sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function getWeeklySales(req, res) {
    try {
        const query = `
            SELECT YEAR(payment_date) AS year, WEEK(payment_date) AS week, SUM(amount) AS total_sales
            FROM Payments
            GROUP BY YEAR(payment_date), WEEK(payment_date)
        `;


        const weeklySales = await connection.query(query);

        res.status(200).json({ weekly_sales: weeklySales });
    } catch (error) {
        console.error('Error fetching weekly sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function getOverallSales(req, res) {
    try {
        const query = 'SELECT SUM(amount) AS total_sales FROM Payments';

        const result = await connection.query(query);
        const overallSales = result[0].total_sales || 0;


        res.status(200).json({ overall_sales: overallSales });
    } catch (error) {
        console.error('Error fetching overall sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getMonthlySales,
    getWeeklySales,
    getOverallSales
};
