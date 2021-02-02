const express = require('express'),
  app = express(),
  Rating = require('./models/Rating'),
  connectDB = require('./config/connectDB'),
  PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/config", (req, res) => {
  res.json({ msg: "server running" })
})

app.post("/api/rate_us", async (req, res) => {
  const { fname, lname, email, rating, comment } = req.body;
  if (fname && lname && rating && comment) {
    const newRate = new Rating({ fname, lname, email, rating, comment });
    await newRate.save();
    return res.status(201).json({ msg: "Rating created", newRate })
  }
});

app.get("/api/ratings", async (req, res) => {
  const rates = await Rating.find();
  const ratings = rates.map(rate => {
    return { fname: rate.fname, lname: rate.lname[0], comment: rate.comment }
  });
  return res.status(200).json({ msg: "Found Ratings", ratings })
});

app.listen(PORT, () => {
  console.log("http://localhost:3001")
})