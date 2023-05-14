const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.get("/id/:uid", usersController.getUserById);

router.get("/:brid", usersController.getUsersByBranch);

router.get("/reservations/:uid", usersController.getUserReservations);

router.get("/branches/:uid", usersController.getUserBranches);

router.get(
  "/reservations/current/:uid",
  usersController.getCurrentReservations
);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("surname").not().isEmpty(),
    check("phone").isLength({ min: 8 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.login
);

router.patch(
  "/:uid/reset_password",
  [check("newPassword").isLength({ min: 8 })],
  usersController.resetPassword
);

router.patch(
  "/:uid/reset_forgotten_password",
  [check("password").isLength({ min: 8 })],
  usersController.resetForgottenPassword
);

router.patch("/:uid/branch_update", usersController.addUserBranch);

module.exports = router;
