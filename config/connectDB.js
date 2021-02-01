const mongoose = require("mongoose");
const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ratings",
    {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  if (connect) console.log("Connected to DB")
  else console.log("Something went wrong")
}

module.exports = connectDB;