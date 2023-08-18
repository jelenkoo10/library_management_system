const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  subscription_expiry: { type: String, required: true },
  is_admin: { type: Boolean, required: true },
  image: { type: String },
  reservations: [
    {
      reservationDate: String,
      returnDate: String,
      bookId: mongoose.Types.ObjectId,
    },
  ],
  books: [{ type: mongoose.Types.ObjectId, required: true, ref: "Book" }],
  favorites: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
  branches: [{ type: mongoose.Types.ObjectId, required: true, ref: "Branch" }],
  comments: [
    {
      commentDate: String,
      commentText: String,
      bookId: mongoose.Types.ObjectId,
      bookName: String,
      bookAuthor: String,
    },
  ],
  wishlist: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
