const connection = require('../../connection/connection');
const Razorpay= require('razorpay');
require('dotenv').config()
const {RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY }= process.env;

// async function handlePayment(req, res){
//     console.log(RAZORPAY_ID_KEY);
    
//     res.status(200).send("ok");
// }


const razorpayInstance= new Razorpay({
    key_id:RAZORPAY_ID_KEY,
    key_secret:RAZORPAY_SECRET_KEY
});

async function handlePayment(req, res){
    const body= req.body;
    const amount= body.amount*100;
    const OrderId=body.OrderId;
    const customerName=body.customerDetail.name;
    const customerEmail=body.customerDetail.email;
    const customerPhone=body.customerDetail.phone;

    // OrderId:OrderId,
    // customerDetail:customerDetail,
    // amount:totalPrice
    const options={
        amount:amount,
        currency:'INR',
        receipt:String(OrderId)
    }

    const Rzp_Order= await razorpayInstance.orders.create(options,(err, order)=>{
        if(err){
            return res.status(400).send({success:false, msg:'RAZORPAY ORDER ID CREATION FAILED.'});
        }

        console.log(order);
        res.status(200).send({
            success:true,
            msg:'RAZORPAY ORDER ID CREATED.',
            rzp_order_id:order.id,
            OrderId:OrderId,
            key_id:RAZORPAY_ID_KEY,
            amount:amount,
            name:customerName,
            email:customerEmail,
            phone:customerPhone

        })

    })
}

module.exports = {
    handlePayment
}