const Card = require("../models/cardModel");

const addCard = async (req, res, next) => {
  const userId = req.params.userId;

  const cardName = req.body.cardName;
  const cardNo = req.body.cardNo;
  const expDate = req.body.expDate;
  const cvv = req.body.cvv;

  try {
    const card = new Card({
      userId: userId,
      cardName: cardName,
      cardNo: cardNo,
      expDate: expDate,
      cvv: cvv,
    });
    await card.save();
    res.status(201).json({ message: "Card saved successfully" });
  } catch (error) {
    res.status(404).json({ message: "Card not saved " + error });
  }
};
const getCards = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const userCards = await Card.find({ userId: userId });

    res.status(200).json({ message: "success", data: userCards });
  } catch (error) {
    res.status(404).json({ message: "Not found " + error, data: [] });
  }
};

const getCard = async (req, res) => {
  try {
    const cardId = req.params.id;

    const card = await Card.findById(cardId);

    res.status(200).json({ message: "success", data: card ? card : null });
  } catch (error) {
    res.status(404).json({ message: "Not found " + error, data: {} });
  }
};

const updateCard = async (req, res) => {
  try {
    const cardId = req.params.id;

    const cardName = req.body.cardName;
    const cardNo = req.body.cardNo;
    const expDate = req.body.expDate;
    const cvv = req.body.cvv;

    const result = await Card.findByIdAndUpdate(
      cardId,
      {
        cardName: cardName,
        cardNo: cardNo,
        expDate: expDate,
        cvv: cvv,
      },
      { new: true }
    );

    console.log("result", result);

    res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    res.status(404).json({ message: "Card not updated " + error });
  }
};

const deleteCard = async (req, res) => {
  try {
    const cardId = req.params.id;

    await Card.findByIdAndDelete(cardId);
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Card not deleted " + error });
  }
};

exports.addCard = addCard;
exports.getCards = getCards;
exports.getCard = getCard;
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;
