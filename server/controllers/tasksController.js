
//const Room = require("../models/roomModel.js");

exports.createtask = async(req, res)=>{
    try {

        const taskData = new Task(req.body);

        if(!taskData){
            return res.status(404).json({msg: "Task data not found"});
        }

        await taskData.save();
        res.status(200).json({msg: "Task created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.getAlltask = async(req, res) =>{
    try {

        const taskData = await Task.find();
        if(!taskData){
            return res.status(404).json({msg:"Task data not found"});
        }
        res.status(200).json(taskData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.getOnetask = async(req, res) =>{
    try {

        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if(!taskExist){
            return res.status(404).json({msg: "Task not found"});
        }
        res.status(200).json(taskExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.updatetask = async(req, res) =>{
    try {

        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if(!taskExist){
            return res.status(401).json({msg:"Task not found"});
        }

        const updatedData = await Room.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "Task updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


exports.deleteTask = async(req, res) =>{
    try {

        const id = req.params.id;
        const taskExist = await Task.findById(id);
        if(!taskExist){
            return res.status(404).json({msg: "Task not exist"});
        }
        await Task.findByIdAndDelete(id);
        res.status(200).json({msg: "Task deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}





