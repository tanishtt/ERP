// const connection=require('./connection/connection');
// const express= require('express');
// const app=express();
// const port=3000;
// const bodyParser= require('body-parser');
// const path= require('path');
// const {Server}= require('socket.io');
// const http= require('http');

// const server=http.createServer(app);

// const io=new Server(server);

// const cash_cust=io.of('/cashier-customer')

// cash_cust.on('connection', socket => {
//   console.log('A user connected');


//   // Handle incoming messages from customer screen
//   socket.on('customerAddProduct', product => {
//     console.log('Customer added product:', product);
//     // Emit the product to the cashier screen
//     cash_cust.emit('productAdded', product);
//   });


//   // Handle incoming messages from cashier screen
//   socket.on('cashierAddProduct', product => {
//     console.log('Cashier added product:', product);
//     // Emit the product to the customer screen
//     cash_cust.emit('productAdded', product);
//   });


//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });





// const LoginAndSignin= require('./routes/LoginAndSignin')
// const customer= require('./routes/customer/customer')
// const admin= require('./routes/admin/admin');
// const cashier= require('./routes/cashier/cashier');
// //const { default: products } = require('razorpay/dist/types/products');



// app.listen(port,(err)=>{
//     if(err){console.log(err);}
//     console.log(`server started at port : ${port}`)
    
// });

// app.use(bodyParser.json());//convert into json
// app.use(bodyParser.urlencoded({extended:true}));//encrypt it.


// app.set('views', path.resolve('./views'));//represents the setting key for the views directory.
// app.set('view engine', 'ejs')


// app.use('/customer',customer);
// app.use('/admin',admin);
// app.use('/cashier',cashier);
// // app.use('/',LoginAndSignin);




// connection.connect((err)=>{
//     if(err){console.log(err);return;}
//     console.log('connected to db')
//     //console.log(connection,typeof(connection));
// });





















// // app.use('/search',searchProduct);
// // app.use('/',homeUrl);
// // app.post('/customer',(req,res)=>{
// //     console.log(req.body);
// //     const obj=req.body;
// //     const insert="insert into customer values(?,?,?,?,?,?)";
// //     connection.query(insert,[obj.CustomerID, obj.FirstName, obj.LastName, obj.Email, obj.Phone, obj.NumberOfTimesVisited],(err,result)=>{
// //         if(err){
// //             console.log(err);
// //             return;
// //         }
// //         console.log("succesffulyy added.", result );
// //     })
// //     res.send('<h1>customer register successfully</h1>');

// // })


// // app.get('/product',(req,res)=>{
// //     //query from database.
// //     connection.query("select * from product",(err, result)=>{
// //         if(err)
// //         {
// //             console.log(err);
// //             return;
// //         }
// //         console.log(result);
// //         res.render('product',{
// //             products: result
// //         });
// //     });

// //     // res.render('product',{
// //     //         products: result
// //     //     });
// //     //yahaan error aaega. kiuki query is a async func by default so
// //     //and also ReferenceError: result is not defined
 
// // });



// // connection.connect((err)=>{
// //     if(err){console.log(err);}
// //     //console.log(connection,typeof(connection));
// // });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./connection/connection');

const app = express();
const port = 3000;

// Serve static files from the built frontend applications
app.use('/customer', express.static(path.join(__dirname, '../frontend/customer/build')));
// app.use('/cashier', express.static(path.join(__dirname, '../frontend/cashier/build')));
// app.use('/admin', express.static(path.join(__dirname, '../frontend/admin/build')));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api/customer', require('./routes/customer/customer'));
// app.use('/api/admin', require('./routes/admin/admin'));
// app.use('/api/cashier', require('./routes/cashier/cashier'));
// app.use('/api', require('./routes/LoginAndSignin'));

// Serve the admin frontend for /admin route
// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/admin/build/index.html'));
// });

// // Serve the cashier frontend for /cashier route
// app.get('/cashier/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/cashier/build/index.html'));
// });

// Serve the customer frontend for /customer route
app.get('/customer/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/customer/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Database connected successfully');
  }
});
