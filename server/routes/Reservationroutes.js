const express=require('express');
const router=express.Router();


 const { createbooking,getAll,getone ,updatebooking,Deletebooking } = require ("../controllers/bookingcontroller.js")

 
 router.post("/create", createbooking);

 router.get('/get',getAll);

 router.get('/get/:id',getone);

 router.patch('/update/:id',updatebooking);

 router.delete('/delete/:id',Deletebooking);
 

 module.exports = router;