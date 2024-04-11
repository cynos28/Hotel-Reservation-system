const Rate = require("../Model/RateModel");

const getAllRate = async (req, res, next) => {
  let rate;
  // Get all rate
  try {
    rate = await Rate.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!rate) {
    return res.status(404).json({ message: "Rate not found" });
  }
  // Display all rate
  return res.status(200).json({ rate });
};

// data Insert
const addRate = async (req, res, next) => {
  const { date, name, gmail, ratestar, comment } = req.body;

  let rate; 

  try {
    rate = new Rate({ date, name, gmail, ratestar, comment });
    await rate.save();
  } catch (err) {
    console.log(err);
  }
  // not insert rates
  if (!rate) {
    return res.status(404).json({ message: "unable to add rates" });
  }
  return res.status(200).json({ rate });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let rate;

  try {
    rate = await Rate.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available rates
  if (!rate) {
    return res.status(404).json({ message: "rate Not Found" });
  }
  return res.status(200).json({ rate });
};



exports.getAllRate = getAllRate;
exports.addRate = addRate;
exports.getById = getById;

