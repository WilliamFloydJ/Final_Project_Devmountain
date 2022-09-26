const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  Login: (req, res) => {
    const { email, password } = req.fields;

    sequelize
      .query(
        `SELECT * FROM USERS WHERE email = '${email}' AND password = '${password}';`
      )
      .then((seq) => {
        const [user_id, email, subscription_plan] = seq[0][0];

        if (bcrypt.compareSync(password, seq[0][0].password)) {
          req.session.user = {
            id: user_id,
            email: email,
            password: seq[0][0].password,
            subscription_plan: subscription_plan,
          };
          console.log(req.session.user);
          res.status(200).send(req.session.user);
        } else {
          res.send("password did not match");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
  },
  CreateAccount: (req, res) => {
    const { email, password } = req.fields;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    sequelize.query(
      `insert into users (password, email, subscription_plan) Values ('${hash}', '${email}', 20);`
    );
  },
  Session: (req, res) => {
    const session = req.session;

    res.status(200).send(session);
  },
};
