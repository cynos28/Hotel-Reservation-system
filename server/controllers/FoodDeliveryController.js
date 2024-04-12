const Delivery = require("../Model/Delivery");

const getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await Delivery.find();
    if (!deliveries || deliveries.length === 0) {
      return res.status(404).json({ message: "No deliveries found" });
    }
    return res.status(200).json({ deliveries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDelivery = async (req, res, next) => {
  const { name, phone, time, date, address, location } = req.body;

  let dili;

  try {
    dili = new Delivery({
      name,
      phone,
      time,
      date,
      address,
      location,
    });
    await dili.save();
  } catch (err) {
    console.log(err);
  }
  // not insert dilis
  if (!dili) {
    return res.status(404).json({ message: "unable to add dilitory" });
  }
  return res.status(200).json({ dili });
};

module.exports = {
  getAllDeliveries,
  addDelivery,
};
