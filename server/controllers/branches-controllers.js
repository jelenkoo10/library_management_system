const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Branch = require("../models/branch");

const getBranches = async (req, res, next) => {
  let branches;
  try {
    branches = await Branch.find();
  } catch (err) {
    return next(
      new HttpError(
        "Nalaženje podataka o ograncima nije uspelo, pokušajte ponovo kasnije.",
        500
      )
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
      new HttpError("Nevalidni unosi, proverite svoje podatke.", 422)
    );
  }

  const { name, city, address, worktime, phone, coords } = req.body;

  const newBranch = new Branch({
    name,
    city,
    address,
    worktime,
    phone,
    coords,
    books: [],
    users: [],
  });

  try {
    await newBranch.save();
  } catch (err) {
    return next(
      new HttpError("Kreiranje ogranka nije uspelo, pokušajte ponovo.", 500)
    );
  }

  res.status(201).json({ branch: newBranch.toObject({ getters: true }) });
};

const updateBranch = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Nevalidni unosi, proverite svoje podatke.", 422)
    );
  }

  const { name, city, address, worktime, phone, coords } = req.body;
  const branchId = req.params.brid;

  let branch;
  try {
    branch = await Branch.findById(branchId);
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, ažuriranje ogranka nije moguće.", 500)
    );
  }

  branch.name = name;
  branch.city = city;
  branch.address = address;
  branch.worktime = worktime;
  branch.phone = phone;
  branch.coords = coords;

  try {
    await branch.save();
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, ažuriranje ogranka nije moguće.", 500)
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
      new HttpError("Došlo je do greške, brisanje ogranka nije moguće.", 500)
    );
  }

  if (!branch) {
    return next(
      new HttpError("Nije moguće pronaći ogranak sa datim ID-om."),
      404
    );
  }

  try {
    await branch.remove();
  } catch (err) {
    return next(
      new HttpError("Došlo je do greške, brisanje ogranka nije moguće.", 500)
    );
  }

  res.status(200).json({ message: "Ogranak je obrisan." });
};

exports.getBranches = getBranches;
exports.createBranch = createBranch;
exports.updateBranch = updateBranch;
exports.deleteBranch = deleteBranch;
