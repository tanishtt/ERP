const excel = require('exceljs');
const connection = require('../../connection/connection');

async function exportToExcelProducts(req, res) {
    try {
        // Retrieve data from the database
        const query = 'SELECT * FROM products';
        await connection.query(query, (err, products) => {
            if (err) {
                console.error('Error fetching daily customers:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Create a new workbook and worksheet
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Products');

            // Define column headers
            worksheet.columns = [
                { header: 'Product ID', key: 'product_id', width: 10 },
                { header: 'Product Name', key: 'product_name', width: 30 },
                { header: 'Description', key: 'description', width: 40 },
                { header: 'Price', key: 'price', width: 15 },
                { header: 'Category ID', key: 'category_id', width: 15 },
                { header: 'Stock Quantity', key: 'stock_quantity', width: 20 },
                { header: 'Last Updated', key: 'last_updated', width: 20 }
            ];

            // Add data to the worksheet
            products.forEach(product => {
                worksheet.addRow(product);
            });

            // Set response headers for Excel file download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

            // Convert workbook to a stream and pipe it to the response
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch(error => {
                    console.error('Error writing Excel:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function exportToExcelOrders(req, res){
try {
        // Retrieve data from the database
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
    await connection.query(query, (err, orders) => {
            if (err) {
                console.error('Error fetching daily customers:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // Create a new workbook and worksheet
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Orders');

            // Define column headers
            worksheet.columns = [
                { header: 'Order ID', key: 'order_id', width: 10 },
                { header: 'Customer Name', key: 'customer_name', width: 30 },
                { header: 'Amount', key: 'amount', width: 40 },
                { header: 'Order Date', key: 'order_date', width: 15 }
            ];

            // Add data to the worksheet
            orders.forEach(order => {
                worksheet.addRow(order);
            });

            // Set response headers for Excel file download
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

            // Convert workbook to a stream and pipe it to the response
            workbook.xlsx.write(res)
                .then(() => {
                    res.end();
                })
                .catch(error => {
                    console.error('Error writing Excel:', error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    exportToExcelProducts,
    exportToExcelOrders
};
