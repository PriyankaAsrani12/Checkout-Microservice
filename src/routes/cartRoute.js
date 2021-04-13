const express=require("express");
const sequelize=require('sequelize');
const student_table=require('../models/student');
const cart_and_wishlist_table=require('../models/cartAndWishlist');
require('../db/sql');
const app=express();

app.use('/web', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/cart/add",async(req,res)=>{
    //Eg. req.body={id:18,type:student,session_id=12}
    parameter=req.body;
    
    //Updating students table
    cart_and_wishlist_table.findByPk(parameter.student_id)
    .then((student)=>{
        //Check if record exists in db
        if (student) {
            var arr=student.student_cart_items
            var x=JSON.parse(arr)
            x.push(parameter.session_id)
            student.update({
                student_cart_items:JSON.stringify(x)
            })
            .then(()=>{
                res.sendStatus(201)
            })
        }
    })
    .catch(()=>{
        console.log("Error");
        res.send("Error");
    })
})

app.post("/cart/delete",(req,res)=>{
    //Eg. req.body={id:18,type:student,session_id=12}
    parameter=req.body;
    
    //Updating students table
    cart_and_wishlist_table.findByPk(parameter.student_id)
    .then((student)=>{
        //Check if record exists in db
        if (student) {
            var arr=student.student_cart_items
            var x=JSON.parse(arr)
            const index = x.indexOf(parameter.session_id);
            if (index > -1) {
                x.splice(index, 1);
            }
            student.update({
                student_cart_items:JSON.stringify(x)
            })
            .then(()=>{
                res.sendStatus(201)
            })
        }
    })
    .catch(()=>{
        console.log("Error");
        res.send("Error");
    })
})

//Cart to wishlist
app.post("/cart/move",(req,res)=>{
    //Eg. req.body={id:18,type:student,session_id=12}
    parameter=req.body;
    
    //Deleting from students table
    cart_and_wishlist_table.findByPk(parameter.student_id)
    .then((student)=>{
        //Check if record exists in db
        if (student) {
            var arr=student.student_cart_items
            var x=JSON.parse(arr)
            const index = x.indexOf(parameter.session_id);
            if (index > -1) {
                x.splice(index, 1);
            }
            student.update({
                student_cart_items:JSON.stringify(x)
            })

            var arr=student.student_wish_list_items
            var x=JSON.parse(arr)
            x.push(parameter.session_id)
            student.update({
                student_wish_list_items:JSON.stringify(x)
            })

            .then(()=>{
                res.sendStatus(201)
            })
        }
    })
    .catch(()=>{
        console.log("Error");
        res.send("Error")
    })
})

module.exports=app;