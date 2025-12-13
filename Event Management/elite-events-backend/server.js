require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Booking = require('./models/Booking');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse form submissions

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// POST route to receive bookings from the form
app.post('/book-event', async (req, res) => {
  try {
    const payload = {
      eventName: req.body.eventName || req.body.event || 'Event',
      name: req.body.name?.trim(),
      email: req.body.email?.trim(),
      phone: req.body.phone?.trim(),
      eventDate: req.body.eventDate,
      guests: Number(req.body.guests),
      venue: req.body.venue,
      message: req.body.message?.trim()
    };

    // Validation
    if (!payload.name || !payload.email || !payload.phone || !payload.eventDate || !payload.guests) {
      return res.status(400).send('Missing required fields');
    }

    await Booking.create(payload);

    // ✅ send only success status (no JSON page)
    return res.sendStatus(201);

  } catch (error) {
    console.error('Booking save error:', error);
    return res.sendStatus(500);
  }
});


app.post('/contact', async (req, res) => {
  try {
    const payload = {
  name: req.body.name?.trim(),
  email: req.body.email?.trim(),
  phone: Number(req.body.phone),
  eventType: req.body.eventType?.trim(),
  message: req.body.message?.trim()
};

    // Validation
    if (!payload.name || !payload.email || !payload.phone || !payload.eventType || !payload.message) {
      return res.status(400).send('Missing required fields');
    }

    await Contact.create(payload);

    // ✅ send only success status (no JSON page)
    return res.sendStatus(201);

  } catch (error) {
    console.error('Contact save error:', error);
    return res.sendStatus(500);
  }
});


// Simple health check
app.get('/', (req, res) => res.send('Elite Events Backend is running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
