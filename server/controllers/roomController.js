const Room = require("../models/roomModel.js");

exports.createBooking = async (req, res) => {
    try {
        let booking = new Booking(req.body);

        if (!booking) {
            return res.status(404).json({ msg: "Booking data not found" });
        }

        let result = await booking.save();
        res.status(200).json({ msg: "Booking created successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAll = async(req, res) =>{
    try {

        const roomData = await Room.find();
        if(!roomData){
            return res.status(404).json({msg:"Room data not found"});
        }
        res.status(200).json(roomData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const roomExist = await Room.findById(id);
        if(!roomExist){
            return res.status(404).json({msg: "Room not found"});
        }
        res.status(200).json(roomExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.update = async(req, res) =>{
    try {

        const id = req.params.id;
        const roomExist = await Room.findById(id);
        if(!roomExist){
            return res.status(401).json({msg:"Room not found"});
        }

        const updatedData = await Room.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "Room updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.deleteRoom = async(req, res) =>{
    try {

        const id = req.params.id;
        const roomExist = await Room.findById(id);
        if(!roomExist){
            return res.status(404).json({msg: "Room not exist"});
        }
        await Room.findByIdAndDelete(id);
        res.status(200).json({msg: "Room deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}





