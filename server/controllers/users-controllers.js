const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Book = require("../models/book");
const Branch = require("../models/branch");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(
      new HttpError("Fetching user failed, please try again later.", 500)
    );
  }
  res.json({
    user: user.toObject({ getters: true }),
  });
};

const getUsersByBranch = async (req, res, next) => {
  const branchId = req.params.brid;

  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
  res.json({
    users: users
      .filter((user) => user.branches.includes(branchId))
      .map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, surname, phone, email, password, branchId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later."),
      500
    );
  }

  if (existingUser) {
    return next(new HttpError("User with this email already exists."), 422);
  }

  const subscription_expiry = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const newUser = new User({
    name,
    surname,
    phone,
    email,
    password: hashedPassword,
    subscription_expiry,
    is_admin: false,
    reservations: [],
    books: [],
    branches: [branchId],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next("Signing up failed, please try again.", 500);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "pitajkonobara",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Logging in failed, please try again"), 500);
  }

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials, couldn't log you in."),
      401
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 403)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "pitajkonobara",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const resetForgottenPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid password passed, password should have at least 8 characters.",
        422
      )
    );
  }

  const { password } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, couldn't update user's password.",
        500
      )
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  user.password = hashedPassword;

  try {
    await user.save();
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, couldn't update user's password.",
        500
      )
    );
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid password passed, password should have at least 8 characters.",
        422
      )
    );
  }

  const { oldPassword, repeatedOldPassword, newPassword } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, couldn't update user's password.",
        500
      )
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(oldPassword, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (oldPassword !== repeatedOldPassword) {
    return next(
      new HttpError("Old password doesn't match repeated old password.", 422)
    );
  } else if (!isValidPassword) {
    return next(
      new HttpError("Typed password doesn't match your old password.", 422)
    );
  } else {
    try {
      let hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      await user.save();
    } catch (err) {
      return next(
        new HttpError(
          "Something went wrong, couldn't update user's password.",
          500
        )
      );
    }
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const getUserReservations = async (req, res, next) => {
  const startDate = req.query.startdate;
  const endDate = req.query.enddate;
  const bookName = req.query.bookname;
  const userId = req.params.uid;

  let startDateFormatted = new Date(startDate);

  let endDateFormatted = new Date(endDate);

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Couldn't find user with the provided ID", 404));
  }

  let bookIds;
  let books = [];
  let filteredReservations = [];
  if (user.reservations) {
    bookIds = user.reservations.map((reservation) => reservation.bookId);
  }

  if (startDate !== "" && endDate !== "") {
    for (let i = 0; i < user.reservations.length; i++) {
      let resDate = new Date(user.reservations[i].reservationDate);
      if (resDate > startDateFormatted && resDate < endDateFormatted) {
        filteredReservations.push(user.reservations[i]);
      }
    }
    bookIds = filteredReservations.map((reservation) => reservation.bookId);
  }

  for (let j = 0; j < bookIds.length; j++) {
    try {
      let book = await Book.findById(bookIds[j]);
      if (
        bookName == "" ||
        book.title.toLowerCase().includes(bookName.toLowerCase())
      ) {
        books.push(book);
      }
    } catch (err) {
      return next(
        new HttpError(
          "Couldn't fetch books for the provided user, please try again later.",
          500
        )
      );
    }
  }

  if (startDate == "" && endDate == "") {
    res.json({
      reservations: user.reservations.map((reservation) =>
        reservation.toObject({ getters: true })
      ),
      books,
    });
  } else {
    res.json({
      reservations: filteredReservations,
      books,
    });
  }
};

const getCurrentReservations = async (req, res, next) => {
  const userId = req.params.uid;

  let today = new Date();

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Couldn't find user with the provided ID", 404));
  }

  let bookIds;
  let books = [];
  let filteredReservations = [];
  if (user.reservations) {
    bookIds = user.reservations.map((reservation) => reservation.bookId);
  }
  try {
    for (let i = 0; i < user.reservations.length; i++) {
      let resDate = new Date(user.reservations[i].reservationDate);
      let endDate = new Date(user.reservations[i].returnDate);
      if (today > resDate && today < endDate) {
        filteredReservations.push(user.reservations[i]);
      }
    }
    bookIds = filteredReservations.map((reservation) => reservation.bookId);
  } catch (err) {
    return next(new HttpError("Couldn't find any reservations.", 404));
  }

  for (let j = 0; j < bookIds.length; j++) {
    try {
      let book = await Book.findById(bookIds[j]);
      books.push(book);
    } catch (err) {
      return next(
        new HttpError(
          "Couldn't fetch books for the provided user, please try again later.",
          500
        )
      );
    }
  }

  res.json({
    reservations: filteredReservations,
    books,
  });
};

const getUserBranches = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Couldn't find user with the provided ID", 404));
  }

  let branches = [];
  try {
    for (let i = 0; i < user.branches.length; i++) {
      let branch = await Branch.findById(user.branches[i]);
      branches.push(branch);
    }
  } catch (err) {
    return next(
      new HttpError(
        "Couldn't fetch branches correctly, please try again later",
        404
      )
    );
  }

  res.json({ branches });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUsersByBranch = getUsersByBranch;
exports.signup = signup;
exports.login = login;
exports.resetForgottenPassword = resetForgottenPassword;
exports.resetPassword = resetPassword;
exports.getUserReservations = getUserReservations;
exports.getCurrentReservations = getCurrentReservations;
exports.getUserBranches = getUserBranches;
