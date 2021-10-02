const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const _ = require('lodash');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (_.isEmpty(req.body)) {
    res.status(400).send({ message: "Dữ liệu đầu vào không đúng!" });
    return;
  }

  if (_.isEmpty(req.body.username)) {
    res.status(400).send({ message: "Thiếu username!" });
    return;
  }

  if (_.isEmpty(req.body.email)) {
    res.status(400).send({ message: "Thiếu email!" });
    return;
  }

  if (_.isEmpty(req.body.password)) {
    res.status(400).send({ message: "Thiếu password!" });
    return;
  }

  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Tài khoản đã tồn tại!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email đã được sử dụng!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Quyền ${req.body.roles[i]} không tồn tại!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
