const connection = require('../../connection/connection');

async function handleGetTodayTotalSell(req, res) {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);


        const query = 'SELECT SUM(total_price) AS total_sell FROM orders WHERE order_date >= ? AND order_date < ?';
        const values = [startOfDay, endOfDay];


        const result = await connection.query(query, values);
        const totalSell = result[0].total_sell || 0;
        res.status(200).json({ total_sell_today: totalSell });

    } catch (error) {
        console.error('Error fetching today\'s total sell:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




async function handleGetMonthlySell(req, res) {
    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);


        const query = 'SELECT SUM(total_price) AS total_sell FROM orders WHERE order_date >= ? AND order_date <= ?';
        const values = [startOfMonth, endOfMonth];


        const result = await connection.query(query, values);
        const totalSell = result[0].total_sell || 0;
        res.status(200).json({ total_sell_monthly: totalSell });

    } catch (error) {
        console.error('Error fetching monthly sell:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function handleGetWeeklySell(req, res) {
    try {
        const today = new Date();

        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week (Sunday)
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // End of the week (Saturday)


        const query = 'SELECT SUM(total_price) AS total_sell FROM orders WHERE order_date >= ? AND order_date <= ?';
        const values = [startOfWeek, endOfWeek];

        const result = await connection.query(query, values);
        const totalSell = result[0].total_sell || 0;

        res.status(200).json({ total_sell_weekly: totalSell });
    } catch (error) {
        console.error('Error fetching weekly sell:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleGetTodayTotalSell,
    handleGetMonthlySell,
    handleGetWeeklySell
};
