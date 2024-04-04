const Event = require('../models/eventModel')
const mongoose = require('mongoose')


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


//post an event
const createEvent = async(req,res) => {
    const {userId,name,cap,date,desc,etype,venue,photo,sTime,eTime,cost} = req.body

    console.log(req.body);

    let emptyFields = []

    // return null;

    if(!userId){
        emptyFields.push('userId')
    }
    if(!name)
    emptyFields.push('name')
    if(!cap){
        emptyFields.push('cap')
    }

    if(!date){
        emptyFields.push('date')
    }
    
    if(!venue){
        emptyFields.push('venue')
    }
    if(!photo){
        emptyFields.push('photo')
    }
    if(!sTime){
        emptyFields.push('sTime')
    }
    if(!eTime){
        emptyFields.push('eTime')
    }
    if(!cost){
        emptyFields.push('cost')
    }

    
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    try{
        const event = await Event.create({userId,name,cap,date,desc,etype,venue,photo,sTime,eTime,cost})
        res.status(200).json(event)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

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
    updateEvent
   }