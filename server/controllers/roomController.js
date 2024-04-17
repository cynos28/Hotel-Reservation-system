    const Room = require("../models/roomModel.js");
    const multer = require("multer");
    const path = require('path');


 
//File Uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/rooms");
        },
        filename: (req, file, cb) => {
          cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
          );
        },
      });
    
   //   const upload = multer({ storage: storage });
    const upload = multer({ storage: storage }).single("image");

    exports.create = async (req, res) => {
    try {
        upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ error: err });
        } else if (err) {
            // An unknown error occurred when uploading
            return res.status(500).json({ error: err });
        }

        // File upload successful, proceed to create room
        const roomData = new Room({
            ...req.body,
            image: req.file.filename, // Save file path instead of URL
        });

        await roomData.save();
        res.status(200).json({ msg: "Room created successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
    };

    // Other CRUD functions remain the same


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




