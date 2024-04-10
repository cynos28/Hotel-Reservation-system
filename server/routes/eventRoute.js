const express=require('express');
const router=express.Router();
const Event = require("../models/eventModel")

const { getEvents,getEvent,createEvent,deleteEvent,updateEvent, createRegisterEvent} = require('../controllers/eventController')

// GET all
router.get('/', getEvents )

// GET a single
router.get('/:id', getEvent)

// POST/register event
router.post('/', createEvent)


router.post('/register/', createRegisterEvent)

// DELETE
router.delete('/:id',deleteEvent )

// PATCH (Update)
router.patch('/:id', updateEvent)


module.exports=router;