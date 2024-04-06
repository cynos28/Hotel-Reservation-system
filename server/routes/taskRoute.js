const express = require("express");
const { createtask, deleteTask, getAlltask, getOnetask, updatetask } = require("../controllers/tasksController.js");

const route = express.Router();

route.post("/create", createtask);
route.get("/getall", getAlltask);
route.get("/getone/:id", getOnetask);
route.put("/update/:id", updatetask);
route.delete("/delete/:id", deleteTask);

module.exports = route;