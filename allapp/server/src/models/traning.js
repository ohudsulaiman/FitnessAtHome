const crypto = require("crypto");
const { Schema, model } = require("mongoose");
const shartId = require("shortid");
const hashPassword = (password, salt) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};
const BlogPost = new Schema({
  link: String,
  type: String,
  author: String,
});

module.exports = model("traning", BlogPost);
