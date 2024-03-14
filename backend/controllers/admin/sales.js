// const connection = require('../../connection/connection');



// // Controller to get total, weekly, monthly, and daily sales counts
// function getSalesCounts(req, res) {


//     // Total sales query
//     connection.query('SELECT SUM(amount) AS total_sales FROM Payments', (err, totalResult) => {
//         if (err) {
//             console.error('Error fetching total sales:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         const totalSales = totalResult[0].total_sales || 0;



//         // Weekly sales query
//         connection.query('SELECT SUM(amount) AS weekly_sales FROM Payments WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
//             if (err) {
//                 console.error('Error fetching weekly sales:', err);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }

//             const weeklySales = weeklyResult[0].weekly_sales || 0;



//             // Monthly sales query
//             connection.query('SELECT SUM(amount) AS monthly_sales FROM Payments WHERE MONTH(payment_date) = MONTH(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, monthlyResult) => {
//                 if (err) {
//                     console.error('Error fetching monthly sales:', err);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//                 const monthlySales = monthlyResult[0].monthly_sales || 0;



//                 // Daily sales query
//                 connection.query('SELECT SUM(amount) AS daily_sales FROM Payments WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
//                     if (err) {
//                         console.error('Error fetching daily sales:', err);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     const dailySales = dailyResult[0].daily_sales || 0;



//                     // Send all counts in JSON response
//                     res.status(200).json({
//                         total_sales: totalSales,
//                         weekly_sales: weeklySales,
//                         monthly_sales: monthlySales,
//                         daily_sales: dailySales
//                     });
//                 });
//             });
//         });
//     });
// }

// module.exports = {
//     getSalesCounts
// };






const async = require('async');
const connection = require('../../connection/connection');

// Controller to get total, weekly, monthly, and daily sales counts
function getSalesCounts(req, res) {
    async.parallel({
        totalSales: getTotalSales,
        weeklySales: getWeeklySales,
        monthlySales: getMonthlySales,
        dailySales: getDailySales
    }, (err, results) => {
        if (err) {
            console.error('Error fetching sales counts:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
}

function getTotalSales(callback) {
    connection.query('SELECT SUM(amount) AS total_sales FROM Payments', (err, totalResult) => {
        if (err) {
            return callback(err);
        }
        const totalSales = totalResult[0].total_sales || 0;
        callback(null, totalSales);
    });
}

function getWeeklySales(callback) {
    connection.query('SELECT SUM(amount) AS weekly_sales FROM Payments WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
        if (err) {
            return callback(err);
        }
        const weeklySales = weeklyResult[0].weekly_sales || 0;
        callback(null, weeklySales);
    });
}

function getMonthlySales(callback) {
    connection.query('SELECT SUM(amount) AS monthly_sales FROM Payments WHERE MONTH(payment_date) = MONTH(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, monthlyResult) => {
        if (err) {
            return callback(err);
        }
        const monthlySales = monthlyResult[0].monthly_sales || 0;
        callback(null, monthlySales);
    });
}

function getDailySales(callback) {
    connection.query('SELECT SUM(amount) AS daily_sales FROM Payments WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
        if (err) {
            return callback(err);
        }
        const dailySales = dailyResult[0].daily_sales || 0;
        callback(null, dailySales);
    });
}

module.exports = {
    getSalesCounts
};
