const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // Assuming the image is stored as a URL
        required: true
    },
    rentPerNight: {
        type: Number,
        required: true
    },
    acAvailability: {
        type: Boolean,
        default: false // Assuming default is false if not specified
    },
    wifiAvailability: {
        type: Boolean,
        default: false // Assuming default is false if not specified
    },
    roomDescription: {
        type: String,
        required: true
    },
    numberOfBeds: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Room", roomSchema);
