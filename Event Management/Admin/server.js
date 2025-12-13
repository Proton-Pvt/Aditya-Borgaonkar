require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Booking = require("./models/Booking");
const Contact = require("./models/Contact");

const app = express();
const PORT = 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/elite_events";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Admin DB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Admin login
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123";

app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) return res.sendStatus(200);
  return res.sendStatus(401);
});

// Routes to fetch data
app.get("/admin/enquiries", async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ _id: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/admin/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Logout
app.get("/admin/logout", (req, res) => res.sendStatus(200));

app.listen(PORT, () => console.log(`Admin server running on http://localhost:${PORT}`));
