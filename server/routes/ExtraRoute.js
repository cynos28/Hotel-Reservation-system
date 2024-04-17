//Functionality routing parth

const express = require("express");
const router = express.Router();
const ExtraController = require("../controllers/ExtraControllers");

router.get("/", ExtraController.getAllExtra);
router.post("/", ExtraController.addExtra);
router.get("/:id", ExtraController.getById);
router.put("/:id", ExtraController.updateExtra);
router.delete("/:id", ExtraController.deleteExtra);
router.get("/extraid/:extraid", ExtraController.getByExtraId);

module.exports = router;
