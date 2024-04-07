const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentControler");

router.get("/", PaymentController.getAllPayment);
router.post("/", PaymentController.addPayment);
router.get("/:id", PaymentController.getById); 
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);
router.get("/payId/:payId", PaymentController.getByPayId);

module.exports = router;
   