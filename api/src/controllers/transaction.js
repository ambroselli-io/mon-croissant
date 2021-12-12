const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");
const FintectureAPI = require("../utils/fintecture");

// FintectureAPI.getAccessToken();
router.post(
  "/donate",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    res.status(200).send({ ok: true, user: req.user.me() });
  })
);

router.get(
  "/redirect",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    console.log(req);
    res.status(200).send("<h1>ok !</h1>");
  })
);

module.exports = router;
