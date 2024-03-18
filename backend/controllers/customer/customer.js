const connection = require('../../connection/connection');

function handleCustomerPage(req, res) {
    return res.json({ msg: "You are in main customer page..." })
}




async function handleOrderSubmit(req, res) {
    //console.log(req.body);
    //data:{customer:{name:name,...}, products:{name:name,...}}
    const body = req.body;

    if (!body) { return res.status(400).json({ error: "customer order is invalid!!!" }) }

    const customerDetail = body.customer;//all order no will be here only.
    const productDetail = body.products;//[{},{},{},{}]

    const customerName = customerDetail.name;
    const customerEmail = customerDetail.email;
    const customerPhone = customerDetail.phone;

    let totalPrice = 0;
    for (let index = 0; index < productDetail.length; index++) {
        const element = productDetail[index]['price'];
        totalPrice += element;
    }

    //first time customer check.
    //check for customer in database,
    //if customer donot exists then update the customer table.
    //else fetch the customer details from database.
    
    const Customer = `select * from customers where email = '${customerEmail}'`;

    connection.query(Customer, (err, result) => {
        if (err) {
            console.log(err); return;
        }
        console.log(result);
        

        if (!result) {
            const createCustomer = "insert into customers values (?,?,?)";
            connection.query(createCustomer, [customerName, customerEmail, customerPhone], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ error: "Error in creating user." })
                }

                console.log("Added customer", result);
                //res.json({ msg: "Added customer successfully!!!" });
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

    console.log(productsString);

    const sql = `
        SET @products = '${productsString}';
    `;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error('Error setting products variable:', error);
            return res.status(500).json({ error: 'Error setting products variable' });
        }

        const insertQuery = `
            INSERT INTO Orders (customer_id, product_details)
            SELECT 
                (SELECT customer_id FROM customers WHERE email = '${customerEmail}') AS customer_id,
                JSON_ARRAYAGG(JSON_OBJECT('product_id', p.product_id, 'quantity', p.quantity)) AS product_details
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
            return res.render('payment',{
                OrderId:OrderId,
                customerDetail:customerDetail,
                amount:totalPrice
            });
//-----------------//here we will redirect to payment page with all these details. 
        });
    });
    //order table done.
    
}





//get products in search bar.
async function getProducts(req, res) {
    //const pName = req.body.product_name;
    // const Products = `select productName, Price from customer where productName like '%${pName}%'`;
    const ProductDetails = `select * from products`;// where product_name like '%${pName}%'`;
    connection.query(ProductDetails,(err, result)=>{
        if(err){
            console.log('internal server error');
            return res.status(500).json({ error: 'Error in fetching product details' });
        }

        console.log(result);
        return res.json(result);
    })
    
}





module.exports = {
    handleCustomerPage,
    handleOrderSubmit,
    getProducts,
}








// const connection = require('../connection/connection');

// async function handleOrderSubmit(req, res) {
//     const body = req.body;

//     if (!body) {
//         return res.status(400).json({ error: "Customer order is invalid!!!" });
//     }

//     const customerDetail = body.customer;
//     const productDetail = body.products;

//     const customerEmail = customerDetail.email;

//     const productsString = JSON.stringify(productDetail);
//     console.log(customerDetail);
//     console.log(productDetail);

//     console.log(productsString);

//     const sql = `
//         SET @products = '${productsString}';
//     `;

//     connection.query(sql, (error, results, fields) => {
//         if (error) {
//             console.error('Error setting products variable:', error);
//             return res.status(500).json({ error: 'Error setting products variable' });
//         }

//         const insertQuery = `
//             INSERT INTO Orders (customer_id, product_details)
//             SELECT 
//                 (SELECT customer_id FROM Customers WHERE email = '${customerEmail}') AS customer_id,
//                 JSON_ARRAYAGG(JSON_OBJECT('product_id', p.product_id, 'quantity', p.quantity)) AS product_details
//             FROM (
//                 SELECT
//                     product_id,
//                     quantity
//                 FROM
//                     JSON_TABLE(
//                         @products,
//                         '$[*]' COLUMNS (
//                             product_id INT PATH '$.product_id',
//                             quantity INT PATH '$.quantity'
//                         )
//                     ) AS products
//             ) AS p;
//         `;

//         connection.query(insertQuery, (error, results, fields) => {
//             if (error) {
//                 console.error('Error inserting order:', error);
//                 return res.status(500).json({ error: 'Error inserting order' });
//             }
//             console.log('Order inserted successfully');
//             res.json({ msg: 'Order inserted successfully' }); // Send response only once
//         });
//     });
// }

// module.exports = {
//     handleOrderSubmit
// };
