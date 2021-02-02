require('dotenv').config();
const express = require('express'),
  app = express(),
  cors = require('cors'),
  path = require('path'),
  Rating = require('./models/Rating'),
  connectDB = require('./config/connectDB'),
  PORT = process.env.PORT || 3001;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/config", (req, res) => {
  res.json({ msg: "server running" })
})

app.post("/api/rate_us", async (req, res) => {
  try {
    const { fname, lname, email, rating, comment } = req.body;
    if (fname && lname && rating && email && comment && rating) {
      const newRate = await Rating.create({ fname, lname, rating: parseInt(rating), email, comment });
      return res.status(201).json({ msg: "nice", newRate })
    }
  } catch (err) {
    return res.status(500).json({ msg: "Unable to submit rating" })
  }
});

app.get("/api/ratings", async (req, res) => {
  const rates = await Rating.find();
  const ratings = rates.map(rate => {
    return { fname: rate.fname, lname: rate.lname[0], rating: rate.rating, comment: rate.comment }
  });
  return res.status(200).json({ msg: "Found Ratings", ratings })
});

/*
@GET route
desc react routes
access public
*/
app.get("/rate_form", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(PORT, () => {
  console.log("http://localhost:3001")
})