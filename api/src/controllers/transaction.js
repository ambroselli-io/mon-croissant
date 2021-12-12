const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config");
const UserObject = require("../models/user");
const { catchErrors } = require("../utils/error");
const FintectureAPI = require("../utils/fintecture");

// let connectConfig = {
//   amount: "125",
//   currency: "EUR",
//   communication: "Thanks mom!",
//   customer_full_name: "Bob Smith",
//   customer_email: "bob.smith@gmail.com",
//   customer_ip: "127.0.0.1",
//   state: "somestate",
//   country: "fr",
// };

// (async () => {
//   let tokens = await FintectureAPI.getAccessToken();
//   console.log({ tokens });
//   let connect = await FintectureAPI.getPisConnect(tokens.access_token, connectConfig);
//   console.log({ connect });
//   // window.href.location = connect.url;

//   // and at any time (ex: to validate a payment on callback)
//   // let payment = await FintectureAPI.getPayments(tokens.access_token, connect.session_id);
//   // console.log("PAYMENT STATUS:", payment.meta.status);
// })();

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
