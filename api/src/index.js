require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const { globalErrorHandler } = require("./utils/error");

const { PORT, WHITE_LIST_DOMAINS } = require("./config.js");

require("./mongo");

// Put together a schema
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
  require("../scripts/migrations");
}

app.use(cors({ credentials: true, origin: WHITE_LIST_DOMAINS.split(",") }));

app.use(express.static(__dirname + "/../public"));
// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text({ type: ["json", "text"] }));
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/user", require("./controllers/user"));
app.use("/shop", require("./controllers/shop"));
app.use("/feedback", require("./controllers/feedback"));

const now = new Date().toISOString();

app.get("/", async (req, res) => {
  res.send(`Hello World at ${now} - ${req.headers.host}`);
});

// Post middleware
require("./passport")(app);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));

app.use(globalErrorHandler);

module.exports = app;
