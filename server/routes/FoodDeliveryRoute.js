const express = require("express");
const router = express.Router();
const DeliveryController = require("../Controllers/DeliveryController");

router.get("/", DeliveryController.getAllDeliveries);
router.post("/", DeliveryController.addDelivery);

module.exports = router;
