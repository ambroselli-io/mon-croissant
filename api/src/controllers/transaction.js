const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");
const FintectureAPI = require("../utils/fintecture");

router.get(
  "/test",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    let tokens = await FintectureAPI.getAccessToken();
    let connect = await FintectureAPI.getPisConnect(tokens.access_token, {
      amount: "125",
      currency: "EUR",
      communication: "Thanks mom!",
      customer_full_name: "Bob Smith",
      customer_email: "bob.smith@gmail.com",
      customer_ip: req.ipInfo,
      state: "somestate",
      country: "fr",
      redirect_uri: "https://app-12d7de78-e9a9-40b4-abb9-22a45d8ae76d.cleverapps.io/transaction/redirect",
    });

    res.status(200).send({ ok: true, connect });
  })
);

router.get(
  "/redirect",
  // passport.authenticate("user", { session: false }),
  catchErrors(async (req, res) => {
    // console.log(req);
    res.status(200).send({
      ok: true,
      data: JSON.stringify({
        originalUrl: req.originalUrl,
        mehod: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      }),
    });
  })
);

module.exports = router;
