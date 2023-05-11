const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  year_published: { type: String, required: true },
  loan_expiry: { type: String },
  status: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "Author" },
  authorName: { type: String, required: true },
  branch: { type: mongoose.Types.ObjectId, required: true, ref: "Branch" },
  branchName: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Book", bookSchema);
