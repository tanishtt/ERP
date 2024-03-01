const connection=require('./connection/connection');
const express= require('express');
const app=express();
const port=3000;
const bodyParser= require('body-parser');
const path= require('path');
// const {Server}= require('socket.io');
// const http= require('http');

// const server=http.createServer(app);

// const io=new Server(server);

// io.on('connection',(socket)=>{

//     console.log('customer connected',socket.id);

//     socket.on('disconnect',()=>{
//         console.log('customer disconnected',socket.id);
//     });
// });





const LoginAndSignin= require('./routes/LoginAndSignin')
const customer= require('./routes/customer/customer')
const admin= require('./routes/admin/admin');
const cashier= require('./routes/cashier/cashier');



app.listen(port,(err)=>{
    if(err){console.log(err);}
    console.log(`server started at port : ${port}`)
    
});

app.use(bodyParser.json());//convert into json
app.use(bodyParser.urlencoded({extended:true}));//encrypt it.


app.set('views', path.resolve('./views'));//represents the setting key for the views directory.
app.set('view engine', 'ejs')



app.use('/customer',customer);
app.use('/admin',admin);
// app.use('/cashier',cashier);
// app.use('/',LoginAndSignin);




connection.connect((err)=>{
    if(err){console.log(err);return;}
    console.log('connected to db')
    //console.log(connection,typeof(connection));
});





















// app.use('/search',searchProduct);
// app.use('/',homeUrl);
// app.post('/customer',(req,res)=>{
//     console.log(req.body);
//     const obj=req.body;
//     const insert="insert into customer values(?,?,?,?,?,?)";
//     connection.query(insert,[obj.CustomerID, obj.FirstName, obj.LastName, obj.Email, obj.Phone, obj.NumberOfTimesVisited],(err,result)=>{
//         if(err){
//             console.log(err);
//             return;
//         }
//         console.log("succesffulyy added.", result );
//     })
//     res.send('<h1>customer register successfully</h1>');

// })


// app.get('/product',(req,res)=>{
//     //query from database.
//     connection.query("select * from product",(err, result)=>{
//         if(err)
//         {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//         res.render('product',{
//             products: result
//         });
//     });

//     // res.render('product',{
//     //         products: result
//     //     });
//     //yahaan error aaega. kiuki query is a async func by default so
//     //and also ReferenceError: result is not defined
 
// });



// connection.connect((err)=>{
//     if(err){console.log(err);}
//     //console.log(connection,typeof(connection));
// });

