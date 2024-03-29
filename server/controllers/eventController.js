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
    const {name,cap,date,desc,etype,venue,estatus,reason} = req.body

    let emptyFields = []

    if(!name)
    emptyFields.push('name')
    if(!cap){
        emptyFields.push('cap')
    }
    if(!date){
        emptyFields.push('date')
    }
    if(!etype){
        emptyFields.push('etype')
    }
    if(!venue){
        emptyFields.push('venue')
    }
    
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    try{
        const event = await Event.create({name,cap,date,desc,etype,venue,estatus,reason})
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

    const event = await Event.findOneAndUpdate({_id: id},{...req.body})

    if(!event){
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}



module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
   }