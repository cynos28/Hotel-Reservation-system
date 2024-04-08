const Event = require('../models/eventModel')
const mongoose = require('mongoose')

const multer = require('multer');
const path = require('path');


//Get All Events
const getEvents = async(req,res) => {
    const events =  await Event.find({}).sort({createdAt: -1})


    res.status(200).json(events)
}

//Get a Single Events
const getEvent = async(req,res) => {
    const {id} = req.params

    //checking if the ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Event'})
    }

    const event = await Event.findById(id)

    if(!event){
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}

// Define storage for the images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/events");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  
  // Create multer instance with defined storage
  const upload = multer({ storage: storage });


//post an event
const createEvent = (req, res) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading file" });
      }
  
      Event.create({ userId:req.body.userID, name: req.body.name, image: req.file.filename, date: req.body.date, cap: req.body.capacity, etype: req.body.eType, venue: req.body.venue, estatus:req.body.eventStatus, sTime: req.body.startTime, eTime: req.body.endingTime, cost: req.body.desc })
        .then((result) => res.json(result))
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Error creating category" });
        });
    });
  };

//post an event
const createRegisterEvent = (req, res) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error uploading file" });
      }
  
      Event.create({ userId:req.body.userID, name: req.body.name, date: req.body.date, cap: req.body.capacity, photo:req.body.photo, etype: req.body.eType, venue: req.body.venue, estatus:req.body.eventStatus, sTime: req.body.startTime, eTime: req.body.endingTime, cost: req.body.desc })
        .then((result) => res.json(result))
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Error creating category" });
        });
    });
  };

//Delete event
const deleteEvent = async(req,res) =>{
    const {id} = req.params
    
    //checking if the ID is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})

    if(!event){
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)

}


//Update event

const updateEvent = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such event'})
    }

    const updatedEvent = await Event.findOneAndUpdate({_id: id}, {$set: req.body}, {new: true})

    if(!updatedEvent){
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(updatedEvent)
}


module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    createRegisterEvent
   }