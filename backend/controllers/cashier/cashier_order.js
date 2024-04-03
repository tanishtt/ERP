const connection = require('../../connection/connection');



async function handleOrderSubmit(req, res) {
    
    const body = req.body;

    if (!body) { return res.status(400).json({ error: "cashier order is invalid!!!" }) }

    const customerDetail = body.customer;
    const productDetail = body.products;

    const customerName = customerDetail.name;
    const customerEmail = customerDetail.email;
    const customerPhone = customerDetail.phone;

    // let totalPrice = 0;
    // for (let index = 0; index < productDetail.length; index++) {
    //     const element = productDetail[index]['price'];
    //     totalPrice += element;
    // }
    const totalPrice= body.price;
    const discountPrice=body.discount_price;
    
    
    const Customer = `select * from customers where email = '${customerEmail}'`;

    connection.query(Customer, (err, result) => {
        if (err) {
            console.log(err); return;
        }
        console.log(result);
        

        if (result.length==0) {
            const createCustomer = "insert into customers (customer_name,email,phone) values (?,?,?)";
            connection.query(createCustomer, [customerName, customerEmail, customerPhone], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ error: "Error in creating user." })
                }

                console.log("Added customer", result);
                
            });
        }
        else{
            console.log('customer exists');
        }
    });



    let OrderId=0;
    // Convert products array to a string
    const productsString = JSON.stringify(productDetail);
    console.log(customerDetail);
    console.log(productDetail);

    console.log("product string",productsString);

    const sql = `
        SET @products = '${productsString}';
    `;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error setting products variable:', error);
            return res.status(500).json({ error: 'Error setting products variable' });
        }

            const insertQuery = `
            INSERT INTO Orders (customer_id, product_details, price, discount_price)
            SELECT 
                (SELECT customer_id FROM customers WHERE email = '${customerEmail}') AS customer_id,
                JSON_ARRAYAGG(JSON_OBJECT('product_id', p.product_id, 'quantity', p.quantity)) AS product_details,
                '${totalPrice}' AS price,
                '${discountPrice}' AS discount_price
            FROM (
                SELECT
                    product_id,
                    quantity
                FROM
                    JSON_TABLE(
                        @products,
                        '$[*]' COLUMNS (
                            product_id INT PATH '$.product_id',
                            quantity INT PATH '$.quantity'
                        )
                    ) AS products
            ) AS p;
        `;


        connection.query(insertQuery, async (error, result, fields) => {
            if (error) {
                console.error('Error inserting order:', error);
                return res.status(500).json({ error: 'Error inserting order' });
            }
            console.log('Order inserted successfully',result,OrderId);
            OrderId= result.insertId;
            console.log(OrderId);
            return res.json({
                OrderId:OrderId,
                customerDetail:customerDetail,
                amount:totalPrice
            });


            
//-----------------//here we will redirect to payment page with all these details. 
        });
    });
    //order table done.
    
}









module.exports = {
    handleOrderSubmit,
}
