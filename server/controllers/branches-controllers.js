const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Branch = require("../models/branch");

const getBranches = async (req, res, next) => {
  let branches;
  try {
    branches = await Branch.find();
  } catch (err) {
    return next(
      new HttpError("Fetching branches failed, please try again later.", 500)
    );
  }
  res.json({
    branches: branches.map((branch) => branch.toObject({ getters: true })),
  });
};

const createBranch = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, city, address, worktime } = req.body;

  const newBranch = new Branch({
    name,
    city,
    address,
    worktime,
  });

  try {
    await newBranch.save();
  } catch (err) {
    return next(
      new HttpError("Creating branch failed, please try again.", 500)
    );
  }

  res.status(201).json({ branch: newBranch.toObject({ getters: true }) });
};

const updateBranch = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, city, address, worktime } = req.body;
  const branchId = req.params.brid;

  let branch;
  try {
    branch = await Branch.findById(branchId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update branch."),
      500
    );
  }

  branch.name = name;
  branch.city = city;
  branch.address = address;
  branch.worktime = worktime;

  try {
    await branch.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't update branch."),
      500
    );
  }

  res.status(200).json({ branch: branch.toObject({ getters: true }) });
};

const deleteBranch = async (req, res, next) => {
  const branchId = req.params.brid;

  let branch;
  try {
    branch = await Branch.findById(branchId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete branch."),
      500
    );
  }

  if (!branch) {
    return next(
      new HttpError("Couldn't find a branch for the provided ID."),
      404
    );
  }

  try {
    await branch.remove();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, couldn't delete branch."),
      500
    );
  }

  res.status(200).json({ message: "Deleted branch." });
};

exports.getBranches = getBranches;
exports.createBranch = createBranch;
exports.updateBranch = updateBranch;
exports.deleteBranch = deleteBranch;
