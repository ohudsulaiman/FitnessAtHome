const router = require("express").Router();
const staff = require("../models/staff");
const Post = require("../models/posts");
const traning = require("../models/traning");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = require("../app");
const nodemailer = require("nodemailer");
const hashPassword = (password, salt = "scret") => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};
router.post("/register", async (req, res) => {
  if ((await req.body.email.split("@")[1].split(".")[0]) === "FitnessAtHome") {
    res.status(401).json({
      Error: "you not have the aplty of single by this email",
    });
  } else {
    const newPost = new Post({
      name: req.body.name,
      email: req.body.email,
      Passward: req.body.Passward,
      phone: req.body.phone,
    });
    newPost
      .save()
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        res.statusCode = 400;
        res.json(err.messge);
      });
  }
});
router.post("/login", async (req, res) => {
  const { email, Passward } = req.body;
  const user =
    (await Post.findOne({ email })) || (await staff.findOne({ email }));
  if (!user) {
    res.statusCode = 401;
    res.json("No User found");
  } else {
    if (user.Passward === hashPassword(Passward, user.salt)) {
      const token = jwt.sign({ sub: user._id, e: user.email }, user.salt, {
        expiresIn: 30 * 60 * 60,
      });
      res.json(token);
    } else {
      res.statusCode = 401;
      res.json(`password is wrong`);
    }
  }
});
router.post("/registerStaff", async (req, res) => {
  const newPost = new staff({
    name: req.body.name,
    email: req.body.email,
    Passward: req.body.Passward,
    phone: req.body.phone,
  });
  newPost
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.json(err.errmsg);
    });
});
router.get("/showTraning/:id", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.decode(token);
    if (!token) {
      res.statusCode = 401;
      res.json("you have no permissions!");
      return;
    }
    const user =
      (await Post.findById(decodedToken.sub)) ||
      (await staff.findById(decodedToken.sub));
    if (!user) {
      res.statusCode = 401;
      res.json("you have no permissions!");
      return;
    }
    jwt.verify(token, user.salt);
  } catch (error) {
    res.statusCode = 401;
    res.json(error.messge);
  }
  traning
    .find({ type: req.params.id })
    .then((result) => res.json(result))
    .catch((err) =>
      res.json({
        errMasg: err,
      })
    );
});
router.post("/addTraning", async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = jwt.decode(token);
    var find = await staff.findById(decodedToken.sub);
    if (!find || !token) {
      res.statusCode = 401;
      res.json("you have no permissions!");
      return;
    }
  } catch (e) {
    res.statusCode = 401;
    res.json(e.messge);
  }
  const newPost = new traning({
    link: req.body.link,
    type: req.body.type,
    author: req.body.author,
  });
  newPost
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      res.statusCode = 400;
      res.json(err.errmsg);
    });
});
router.post("/forget", async (req, res) => {
  var email = req.body.email;
  const user =
    (await Post.findOne({ email })) || (await staff.findOne({ email }));
  if (!user) {
    res.json("not foud");
    res.statusCode = 401;
  }
  const token = jwt.sign({ sub: user._id }, user.email, {
    expiresIn: 30 * 60 * 60,
  });

  var smtpTransport = nodemailer.createTransport({
    service: `"Gmail`,
    auth: {
      user: `adobe7007001@gmail.com`,
      pass: "Aa6243240",
    },
  });
  smtpTransport.sendMail(
    {
      to: user.email,
      from: "adobe7007001@gmail.com",
      subject: `do you forget password ?`,
      text:
        `you are forget the password it is the link to change clc http://localhost:3000` +
        `/newPass/` +
        token +
        " ",
    },
    function (err) {
      return res.json("we are sent mesage by email ");
    }
  );
});
router.get("/reset/:id", async (req, res) => {
  var take_id = req.params.id;
  res.redirect("http://localhost:3000/forgetPassword/" + take_id);
});
router.put("/reset", async (req, res) => {
  var token = await req.headers.authorization;
  const decodedToken = jwt.decode(token);
  if (!decodedToken) {
    res.statusCode = 401;
    res.json("not found").end();
    return;
  }

  const user =
    (await Post.findById(decodedToken.sub)) ||
    (await staff.findById(decodedToken.sub));

  if (!user) {
    res.status(401).json("not found accunt").end();
    return;
  }
  user
    .updateOne({
      Passward: hashPassword(req.body.Passward, user.salt),
    })
    .then((result) => res.json("succeed"))
    .catch((err) => res.json(err));
});
module.exports = router;
