const express = require("express");
const { check } = require("express-validator");

const branchesController = require("../controllers/branches-controllers");

const router = express.Router();

router.get("/", branchesController.getBranches);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("city").not().isEmpty(),
    check("address").not().isEmpty(),
    check("worktime").not().isEmpty(),
    check("phone").not().isEmpty(),
    check("coords").not().isEmpty(),
  ],
  branchesController.createBranch
);

router.patch(
  "/:brid",
  [
    check("name").not().isEmpty(),
    check("city").not().isEmpty(),
    check("address").not().isEmpty(),
    check("worktime").not().isEmpty(),
    check("phone").not().isEmpty(),
    check("coords").not().isEmpty(),
  ],
  branchesController.updateBranch
);

router.delete("/:brid", branchesController.deleteBranch);

module.exports = router;
