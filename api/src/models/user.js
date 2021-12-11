const mongoose = require("mongoose");
const MODELNAME = "User";

const Schema = new mongoose.Schema(
  {
    pseudo: { type: String, trim: true, unique: true, sparse: true },
    password: { type: String },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

Schema.methods.me = function () {
  return {
    _id: this._id,
    pseudo: this.pseudo,
  };
};

module.exports = mongoose.model(MODELNAME, Schema);
