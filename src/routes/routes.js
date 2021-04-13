const express=require('express');
const sequelize=require('sequelize');
const cartRoute=require('./cartRoute');
const wishlistRoute=require('./wishlistRoute');
const paymentRoute=require('./paymentRoute');
const decodingJWT=require('../JWT/decoding');
const student_table=require('../models/student');
const purchase_table=require('../models/purchase');
const cart_and_wishlist_table=require('../models/cartAndWishlist');
require('../db/sql');
const app=express();

app.get("/checkout/:code",async(req,res)=>{
    //Verifying and decoding JWT token
    //code:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoxLCJ0eXBlIjoic3R1ZGVudCJ9.Mp69RtaEEIRiAKl8NCiShhSs8aEjJX8Wt_CUMpj65JE
    parameter=decodingJWT(req.params.code);
    //student_id = 18
    //type = "student"
    
    //items=SELECT student_cart_items,student_wish_list_items FROM Student WHERE student_id=id;
    const items = await cart_and_wishlist_table.findByPk(parameter.student_id);
    if (items === null) {
        console.log('Not found!');
        res.statusCode(404);
    }
    res.send(items);
})


//Require cartRoute
//Require wishlistRoute
app.use('/',cartRoute);
app.use('/',wishlistRoute);


app.post("/buy",async(req,res)=>{
    //items={id=18,session_id=[10,12,3],purchase_type=single/cart(depends on length of cart),...}
    parameters=req.body;
    if(JSON.parse(parameters.session_id).length>1){
        parameters.purchase_type="cart";
        parameters.purchase_units_taken=JSON.stringify(JSON.parse(parameters.session_id).length);
    }else{
        parameters.purchase_type="single";
        parameters.purchase_units_taken="1";
    }

    //INSERT INTO Purchase table
    const purchase = await purchase_table.create(parameters)
    .then(()=>{
        student=parameters.student_id;
        res.redirect(`/payment/${student}`)
    })
    .catch(()=>res.send("Error"))
})


//Require payment
app.use('/',paymentRoute);

module.exports=app;