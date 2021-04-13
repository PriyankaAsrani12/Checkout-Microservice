const express=require("express");
const app=express();
const ejs=require("ejs");
var Razorpay = require("razorpay");
const purchase_table=require('../models/purchase');
const {KEY_ID,KEY_SECRET}=require('../../env');

app.set("view engine","ejs");

const instance=new Razorpay({
    key_id:KEY_ID,
    key_secret:KEY_SECRET
});

app.get("/payment/:id",async(req,res)=>{
    parameter=req.params.id;
    purchase_table.findAll({
        limit: 1,
        where: {
          student_id:parameter
        },
        order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(entries){
        res.render("payment",{student_id:parameter,amount:entries[0].purchase_amount,id:entries[0].purchase_id});    
    }).catch(function(){
        console.log('Not found!');
        res.sendStatus(404);
    })
})


//Creating order
app.post("/api/payment/order",(req,res)=>{
    params=req.body;
    instance.orders.create(params).then((data) => {
        res.send({"sub":data,"status":"success"});
    }).catch((error) => {
        res.send({"sub":error,"status":"failed"});
    });
});

//Verifying signatures
app.post("/api/payment/verify",async (req,res)=>{
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', "GCUbOW1rWB7fTKmOv5KTJ9QT")
                                    .update(body.toString())
                                    .digest('hex');
    
    const errHandler=err=>{
        console.log("Error: ",err);
    };
    var response={};
    if(expectedSignature === req.body.razorpay_signature){
        response={"status":"success"};
        //Update purchase table=>if id matches and payment completed
        purchase_table.findByPk(req.body.purchase)
        .then((bought)=>{
            //Check if record exists in db
            if (bought) {
                bought.update({
                    payment_done:1
                })
                .then(()=>{
                    console.log("Payment done")
                })
            }
        })
        .catch(()=>{
            console.log("Error");
        })
    }
    else{
        response={"status":"failure"};
    }
    res.send(response);
});

module.exports=app;