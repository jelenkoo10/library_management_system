const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

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
  const { name, surname, phone, email, password } = req.body;

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

  const newUser = new User({
    name,
    surname,
    phone,
    email,
    password,
    subscription_expiry,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next("Signing up failed, please try again.", 500);
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
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

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, couldn't log you in."),
      401
    );
  }

  res.json({
    message: "Successfully logged in!",
    user: existingUser.toObject({ getters: true }),
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

  user.password = password;

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

  if (oldPassword !== repeatedOldPassword) {
    return next(
      new HttpError("Old password doesn't match repeated old password.", 422)
    );
  } else if (user.password !== oldPassword) {
    return next(
      new HttpError("Typed password doesn't match your old password.", 422)
    );
  } else {
    user.password = newPassword;
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
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.getUsersByBranch = getUsersByBranch;
exports.signup = signup;
exports.login = login;
exports.resetForgottenPassword = resetForgottenPassword;
exports.resetPassword = resetPassword;
