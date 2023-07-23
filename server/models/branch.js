const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const branchSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  worktime: { type: String, required: true },
  phone: { type: String, required: true },
  coords: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  books: [{ type: mongoose.Types.ObjectId, required: true, ref: "Book" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Branch", branchSchema);
