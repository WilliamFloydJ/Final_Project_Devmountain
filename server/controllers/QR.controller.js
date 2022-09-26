const axios = require("axios");
require("dotenv").config();
const QrCode = require("qrcode-reader");
const Jimp = require("jimp");
const fs = require("fs");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  QrRead: (req, res) => {
    const buffer = fs.readFileSync(req.files.file.path);
    Jimp.read(buffer, (err, image) => {
      if (err) {
        console.error(err);
      }
      var qr = new QrCode();
      qr.callback = (err, value) => {
        if (err) {
          console.error(err);
        }
        let readValue = value.result;
        if (req.fields.type === "axios") {
          res.status(200).send(readValue);
        } else {
          res.status(200).redirect(readValue);
        }
      };
      qr.decode(image.bitmap);
    });
  },
  QrCreate: (req, res) => {
    const { body } = req;

    const createArr = body.split("/");

    switch (createArr.length) {
      case 1:
        console.error("Error In Creation of Location");
      case 2:

      case 3:

      case 4:
    }

    res.status(200);
  },
  Login: (req, res) => {
    const { email, password } = req.fields;

    sequelize
      .query(
        `SELECT * FROM USERS WHERE email = '${email}' AND password = '${password}';`
      )
      .then((seq) => {
        console.log(seq[0]);
        res.status(200).redirect("/Account");
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
    // insert into users (password, email, subscription_plan) Values ('Colton2020', 'floydfamily71@gmail.com', 20);
  },
};
