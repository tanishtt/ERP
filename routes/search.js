const express=require('express');
const connection=require('../connection/connection');

const router= express.Router();

router.post('/',(req, res)=>{

    const searchTerm = req.body;
    // const obj=req.body;
    // const insert="insert into customer values(?,?,?,?,?,?)";
    // connection.query(insert,[obj.CustomerID, obj.FirstName, obj.LastName, obj.Email, obj.Phone, obj.NumberOfTimesVisited],(err,result)=>{
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log("succesffulyy added.", result );
    // })
    if (!searchTerm) {
      return res.status(400).json({ error: 'Search term is required' });
    }
  console.log(searchTerm.search);
    const searchQuery = `SELECT * FROM product WHERE ProductName like ${searchTerm.search}`;

    connection.query(searchQuery, (error, results) => {
      if (error) {
        console.error('error executing MySQL query');
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    console.log(searchTerm);
    res.render('searchproduct',{...searchTerm});
    });


});


module.exports= router;