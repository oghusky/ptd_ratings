const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  rating: {
    type: Number
  },
  comment: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 200
  }
}, { timestamps: true });

module.exports = mongoose.model("Rating", RatingSchema);
