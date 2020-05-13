const { Schema, model } = require("mongoose");
const shartId = require("shortid");
const crypto = require("crypto");
const hashPassword = (password, salt = "scret") => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};
const staff = new Schema({
  name: String,
  email: { type: String, unique: true },
  Passward: String,
  phone: { type: String, unique: true },
  salt: String,
});
staff.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shartId.generate();
  }
  if (this.Passward) {
    this.Passward = hashPassword(this.Passward, this.salt);
  }

  next();
});
module.exports = model("staff", staff);
