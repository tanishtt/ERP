const connection=require('./connection/connection');
const express= require('express');
const app=express();
const port=8080;
const bodyParser= require('body-parser');
const path= require('path');


const homeUrl= require('./routes/home')
const productUrl= require('./routes/product')
const searchProduct= require('./routes/search');

app.listen(port,(err)=>{
    if(err){console.log(err);}
    console.log(`server started at port : ${port}`)
    
});

app.use(bodyParser.json());//convert into json
app.use(bodyParser.urlencoded({extended:true}));//encrypt it.


app.set('views', path.resolve('./views'));//represents the setting key for the views directory.
app.set('view engine', 'ejs')


app.use('/search',searchProduct);
app.use('/',homeUrl);



app.post('/customer',(req,res)=>{
    console.log(req.body);
    const obj=req.body;
    const insert="insert into customer values(?,?,?,?,?,?)";
    connection.query(insert,[obj.CustomerID, obj.FirstName, obj.LastName, obj.Email, obj.Phone, obj.NumberOfTimesVisited],(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("succesffulyy added.", result );
    })
    res.send('<h1>customer register successfully</h1>');

})


app.get('/product',(req,res)=>{
    //query from database.
    connection.query("select * from product",(err, result)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        console.log(result);
        res.render('product',{
            products: result
        });
    });

    // res.render('product',{
    //         products: result
    //     });
    //yahaan error aaega. kiuki query is a async func by default so
    //and also ReferenceError: result is not defined
 
});



connection.connect((err)=>{
    if(err){console.log(err);}
    //console.log(con,typeof(con));
});

