const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const  ReservationRoutes = require ('./routes/ReservationRoutes')


const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


require("./db/connection");
const booking = require("./Models/UserDetails") ;
const { reset } = require('nodemon');


//route




//create data -- save to mongoDB
const  createbooking = async(req,res)=>{
    let Booking = new booking (req.body);
    let result = await Booking.save();
    res.send(result);

}

//Get All Data
const getAll = async (req,res)=>{
    let result = await booking.find({})
    res.json({success : true , data : result})

}

//Get unique id
const getone = async(req,res,)=>{
    const id = req.params.id
    booking.findById({_id:id})
    .then(post => res.json(post))
    .catch(err => console.log(err));
}
    

//update task

const updatebooking = async(req,res)=>{
    const id = req.params.id;
    booking.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        NIC : req.body.NIC,
        email : req.body.email,
        phonenumber : req.body.phonenumber,
        country: req.body.country,
        adults:req.body.adults,
        kids:req.body.kids,
    }).then(booking=>res.json(booking))
    .catch(err => res.json(err))
}


//delete data  ​http://localhost:4000/delete
const Deletebooking = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    let result = await booking.deleteOne({_id:id})
    res.send({success: true,  message:"Data Deleted  Successfull",data : result})
}
 
app.listen(4000);

module.exports ={
    createbooking ,getAll,getone ,updatebooking,Deletebooking 
}


