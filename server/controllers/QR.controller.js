const axios = require("axios");
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

      case 2:

      case 3:

      case 4:
    }

    res.status(200);
  },
};
