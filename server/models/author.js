const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  biography: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  nationality: { type: String, required: true },
  age: { type: Number, required: true, min: 10, max: 100 },
  image: { type: String },
  books: [{ type: mongoose.Types.ObjectId, required: true, ref: "Book" }],
});

module.exports = mongoose.model("Author", authorSchema);
