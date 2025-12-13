const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true },
  eventDate: { type: Date, required: true },
  guests:    { type: Number, required: true, min: 1 },
  venue:     { type: String },
  message:   { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
