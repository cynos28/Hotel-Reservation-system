const express = require("express");
const router = express.Router({ mergeParams: true });
const cardController = require("../controllers/cardController");

router.post("/", cardController.addCard);
router.get("/", cardController.getCards);
router.get("/:id", cardController.getCard);
router.put("/:id", cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;
