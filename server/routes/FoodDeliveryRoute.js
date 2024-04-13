const express = require("express");
const router = express.Router();
const DeliveryController = require("../controllers/FoodDeliveryController");

router.get("/", DeliveryController.getAllDeliveries);
router.post("/", DeliveryController.addDelivery);

module.exports = router;
