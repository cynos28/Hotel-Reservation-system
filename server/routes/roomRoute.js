const express = require("express");
const { create, deleteRoom, getAll, getOne, update } = require("../controllers/roomController.js");

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteRoom);

module.exports = route;
