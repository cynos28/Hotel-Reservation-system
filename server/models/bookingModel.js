const mongoose= require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    
    name:String,

    NIC:String,

    email: String,

    phonenumber : String,

    country:String,

    adults: String,

    kids:String,
    
    referance:String,
    
    

    


},{
    timestamps : true 
})

module.exports = mongoose.model("rooms_details",UserDetailsSchema);