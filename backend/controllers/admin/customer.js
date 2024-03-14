// const connection = require('../../connection/connection');

// // Controller to get total, weekly, monthly, and daily customer counts
// function getCustomerCounts(req, res) {
//     // Total customers query
//     connection.query('SELECT COUNT(DISTINCT customer_id) AS total_customers FROM Orders', (err, totalResult) => {
//         if (err) {
//             console.error('Error fetching total customers:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         const totalCustomers = totalResult[0].total_customers;

//         // Weekly customers query
//         connection.query('SELECT COUNT(DISTINCT customer_id) AS weekly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
//             if (err) {
//                 console.error('Error fetching weekly customers:', err);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }

//             const weeklyCustomers = weeklyResult[0].weekly_customers;

//             // Monthly customers query
//             connection.query(`SELECT COUNT(DISTINCT customer_id) AS monthly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) = MONTH(CURDATE())`, (err, monthlyResult) => {
//                 if (err) {
//                     console.error('Error fetching monthly customers:', err);
//                     return res.status(500).json({ error: 'Internal server error' });
//                 }

//                 const monthlyCustomers = monthlyResult[0].monthly_customers;

//                 // Daily customers query
//                 connection.query('SELECT COUNT(DISTINCT customer_id) AS daily_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
//                     if (err) {
//                         console.error('Error fetching daily customers:', err);
//                         return res.status(500).json({ error: 'Internal server error' });
//                     }

//                     const dailyCustomers = dailyResult[0].daily_customers;

//                     // Send all counts in JSON response
//                     res.status(200).json({
//                         total_customers: totalCustomers,
//                         weekly_customers: weeklyCustomers,
//                         monthly_customers: monthlyCustomers,
//                         daily_customers: dailyCustomers
//                     });
//                 });
//             });
//         });
//     });
// }


// function getAllCustomers(req, res){
//     const query='select * from customers';
//     connection.query(query,(err, results)=>{
//         if (err) {
//                 console.error('Error fetching daily customers:', err);
//                 return res.status(500).json({ error: 'Internal server error' });
//             }

//         return res.status(200).json({
//             customers:results
//         })
//     })
// }
// module.exports = {
//     getCustomerCounts,
//     getAllCustomers
// };





//mutlithreading.
// const { Worker, isMainThread, parentPort } = require('worker_threads');
// const connection = require('../../connection/connection');

// // Controller to get total, weekly, monthly, and daily customer counts
// function getCustomerCounts(req, res) {
//     if (isMainThread) {
//         // Create separate worker threads for each query
//         const totalWorker = new Worker(__filename);
//         const weeklyWorker = new Worker(__filename);
//         const monthlyWorker = new Worker(__filename);
//         const dailyWorker = new Worker(__filename);

//         let results = {};

//         // Message handler for each worker
//         totalWorker.on('message', message => {
//             results.total_customers = message;
//             checkAllResults();
//         });

//         weeklyWorker.on('message', message => {
//             results.weekly_customers = message;
//             checkAllResults();
//         });

//         monthlyWorker.on('message', message => {
//             results.monthly_customers = message;
//             checkAllResults();
//         });

//         dailyWorker.on('message', message => {
//             results.daily_customers = message;
//             checkAllResults();
//         });

//         // Error handling for workers
//         totalWorker.on('error', handleError);
//         weeklyWorker.on('error', handleError);
//         monthlyWorker.on('error', handleError);
//         dailyWorker.on('error', handleError);

//         // Start workers
//         totalWorker.postMessage({ action: 'getTotalCustomers' });
//         weeklyWorker.postMessage({ action: 'getWeeklyCustomers' });
//         monthlyWorker.postMessage({ action: 'getMonthlyCustomers' });
//         dailyWorker.postMessage({ action: 'getDailyCustomers' });

//         // Function to check if all results are received and send the response
//         function checkAllResults() {
//             if (Object.keys(results).length === 4) {
//                 res.status(200).json(results);
//             }
//         }
//     }
// }

// function getTotalCustomers(callback) {
//     connection.query('SELECT COUNT(DISTINCT customer_id) AS total_customers FROM Orders', (err, totalResult) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, totalResult[0].total_customers);
//     });
// }

// function getWeeklyCustomers(callback) {
//     connection.query('SELECT COUNT(DISTINCT customer_id) AS weekly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, weeklyResult[0].weekly_customers);
//     });
// }

// function getMonthlyCustomers(callback) {
//     connection.query(`SELECT COUNT(DISTINCT customer_id) AS monthly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) = MONTH(CURDATE())`, (err, monthlyResult) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, monthlyResult[0].monthly_customers);
//     });
// }

// function getDailyCustomers(callback) {
//     connection.query('SELECT COUNT(DISTINCT customer_id) AS daily_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, dailyResult[0].daily_customers);
//     });
// }

// function handleError(err) {
//     console.error('Error:', err);
//     process.exit(1);
// }

// function getAllCustomers(req, res) {
//     const query = 'select * from customers';
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error('Error fetching all customers:', err);
//             return res.status(500).json({ error: 'Internal server error' });
//         }

//         return res.status(200).json({
//             customers: results
//         });
//     });
// }

// module.exports = {
//     getCustomerCounts,
//     getAllCustomers
// };

// if (!isMainThread) {
//     // If the code is running in a worker thread, set up the message listener
//     parentPort.on('message', (message) => {
//         if (message.action === 'getTotalCustomers' || message.action === 'getWeeklyCustomers' || message.action === 'getMonthlyCustomers' || message.action === 'getDailyCustomers') {
//             // Execute the appropriate query function and send the result back to the main thread
//             switch (message.action) {
//                 case 'getTotalCustomers':
//                     getTotalCustomers((err, totalCustomers) => {
//                         if (err) {
//                             handleError(err);
//                         } else {
//                             parentPort.postMessage(totalCustomers);
//                         }
//                     });
//                     break;
//                 case 'getWeeklyCustomers':
//                     getWeeklyCustomers((err, weeklyCustomers) => {
//                         if (err) {
//                             handleError(err);
//                         } else {
//                             parentPort.postMessage(weeklyCustomers);
//                         }
//                     });
//                     break;
//                 case 'getMonthlyCustomers':
//                     getMonthlyCustomers((err, monthlyCustomers) => {
//                         if (err) {
//                             handleError(err);
//                         } else {
//                             parentPort.postMessage(monthlyCustomers);
//                         }
//                     });
//                     break;
//                 case 'getDailyCustomers':
//                     getDailyCustomers((err, dailyCustomers) => {
//                         if (err) {
//                             handleError(err);
//                         } else {
//                             parentPort.postMessage(dailyCustomers);
//                         }
//                     });
//                     break;
//             }
//         }
//     });
// }

























const async = require('async');
const connection = require('../../connection/connection');

// Controller to get total, weekly, monthly, and daily customer counts
function getCustomerCounts(req, res) {
    async.parallel({
        totalCustomers: getTotalCustomers,
        weeklyCustomers: getWeeklyCustomers,
        monthlyCustomers: getMonthlyCustomers,
        dailyCustomers: getDailyCustomers
    }, (err, results) => {
        if (err) {
            console.error('Error fetching customer counts:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
}

function getTotalCustomers(callback) {
    connection.query('SELECT COUNT(DISTINCT customer_id) AS total_customers FROM Orders', (err, totalResult) => {
        if (err) {
            return callback(err);
        }
        callback(null, totalResult[0].total_customers);
    });
}

function getWeeklyCustomers(callback) {
    connection.query('SELECT COUNT(DISTINCT customer_id) AS weekly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE WEEK(payment_date) = WEEK(CURDATE()) and YEAR(payment_date) = YEAR(CURDATE())', (err, weeklyResult) => {
        if (err) {
            return callback(err);
        }
        callback(null, weeklyResult[0].weekly_customers);
    });
}

function getMonthlyCustomers(callback) {
    connection.query(`SELECT COUNT(DISTINCT customer_id) AS monthly_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE YEAR(payment_date) = YEAR(CURDATE()) AND MONTH(payment_date) = MONTH(CURDATE())`, (err, monthlyResult) => {
        if (err) {
            return callback(err);
        }
        callback(null, monthlyResult[0].monthly_customers);
    });
}

function getDailyCustomers(callback) {
    connection.query('SELECT COUNT(DISTINCT customer_id) AS daily_customers FROM Orders INNER JOIN Payments ON Orders.order_id = Payments.order_id WHERE DATE(payment_date) = CURDATE()', (err, dailyResult) => {
        if (err) {
            return callback(err);
        }
        callback(null, dailyResult[0].daily_customers);
    });
}

function getAllCustomers(req, res){
    const query='select * from customers';
    connection.query(query,(err, results)=>{
        if (err) {
            console.error('Error fetching all customers:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({
            customers: results
        });
    });
}

module.exports = {
    getCustomerCounts,
    getAllCustomers
};
