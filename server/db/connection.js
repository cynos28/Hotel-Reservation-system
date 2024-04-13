const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://sendtocynos:1234@hotelreservation.ttxk7wp.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})




.then(()=>{
    console.log("MongoDB Connection Succesfull ");
})
.catch(()=>{
    console.log('failed');
})