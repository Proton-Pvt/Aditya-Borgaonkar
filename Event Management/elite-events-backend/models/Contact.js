const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: Number, required: true },
  eventType: { type: String, required: true },
  message:   { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);
