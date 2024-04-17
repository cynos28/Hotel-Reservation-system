const Extra = require("../models/ExtraModel");

const getAllExtra = async (req, res, next) => {
  let extra;
  // Get all extra
  try {
    extra = await Extra.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!extra) {
    return res.status(404).json({ message: "extra not found" });
  }
  // Display all extra
  return res.status(200).json({ extra });
};

// data Insert
const addExtra = async (req, res, next) => {
  const {
    name,
    gmail,
    phone,
    gym,
    pool,
    bar,
    spa,
    vehicle,
    dayplan,
    specialday,
    petfriend,
    total,
    extraid,
  } = req.body;

  let extra;

  try {
    extra = new Extra({
      name,
      gmail,
      phone,
      gym,
      pool,
      bar,
      spa,
      vehicle,
      dayplan,
      specialday,
      petfriend,
      total,
      extraid,
    });
    await extra.save();
  } catch (err) {
    console.log(err);
  }
  // not insert extras
  if (!extra) {
    return res.status(404).json({ message: "unable to add extra" });
  }
  return res.status(200).json({ extra });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let extra;

  try {
    extra = await Extra.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available extras
  if (!extra) {
    return res.status(404).json({ message: "extra Not Found" });
  }
  return res.status(200).json({ extra });
};

//Update extra Details
const updateExtra = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    gmail,
    phone,
    gym,
    pool,
    bar,
    spa,
    vehicle,
    dayplan,
    specialday,
    total,
    extraid,
  } = req.body;

  let extra;

  try {
    extra = await Extra.findByIdAndUpdate(id, {
      name: name,
      gmail: gmail,
      phone: phone,
      gym: gym,
      pool: pool,
      bar: bar,
      spa: spa,
      vehicle: vehicle,
      dayplan: dayplan,
      specialday: specialday,
      total: total,
      extraid: extraid,
    });
    extra = await extras.save();
  } catch (err) {
    console.log(err);
  }
  if (!extra) {
    return res.status(404).json({ message: "Unable to Update extra Details" });
  }
  return res.status(200).json({ extra });
};

//Delete extra Details
const deleteExtra = async (req, res, next) => {
  const id = req.params.id;

  let extra;

  try {
    extra = await Extra.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!extra) {
    return res.status(404).json({ message: "Unable to Delete extra Details" });
  }
  return res.status(200).json({ extra });
};

const getByExtraId = async (req, res) => {
  try {
    const { extraid } = req.params;

    // Fetch extra details from the database based on the extra ID
    const extra = await Extra.findOne({ extraid });

    if (!extra) {
      return res.status(404).json({ message: "extra not found" });
    }

    // If the extra is found, return it in the response
    res.status(200).json({ extra });
  } catch (error) {
    console.error("Error fetching extra details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllExtra = getAllExtra;
exports.addExtra = addExtra;
exports.getById = getById;
exports.getByExtraId = getByExtraId;
exports.updateExtra = updateExtra;
exports.deleteExtra = deleteExtra;
