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

        res.status(200).send(readValue);
      };
      qr.decode(image.bitmap);
    });
  },
  QrCreate: (req, res) => {
    const { fields } = req;
    const { id } = req.session.user;

    const createArr = fields.data.split("@");

    switch (fields.type) {
      case "company":
        sequelize.query(
          `Insert Into company_names(user_id,name,description) values (${id},'${
            createArr[createArr.length - 1]
          }','${fields.description}')`
        );
        break;
      case "warehouse":
        sequelize.query(
          `Insert Into warehouse_names(user_id,name,parent_location,description) values (${id},'${
            createArr[createArr.length - 1]
          }','${createArr[createArr.length - 2]} company','${
            fields.description
          }')`
        );
        break;
      case "location":
        sequelize.query(
          `Insert Into location_names(user_id,name,parent_location,description) values (${id},'${
            createArr[createArr.length - 1]
          }','${createArr[createArr.length - 2]} warehouse','${
            fields.description
          }')`
        );
        break;
      case "box":
        sequelize.query(
          `Insert Into box_names(user_id,name,parent_location,description,item_name,quantity) values (${id},'${
            createArr[createArr.length - 1]
          }','${createArr[createArr.length - 2]} ${
            createArr.length === 4 ? "location" : "warehouse"
          }','${fields.description}','${fields.itemId}',${fields.quantity})`
        );
        break;
      case "product":
        sequelize.query(
          `Insert Into product_names(user_id,name,parent_location,description,item_name) values (${id},'${
            createArr[createArr.length - 1]
          }','${createArr[createArr.length - 2]} ${
            createArr.length === 5
              ? "box"
              : createArr.length === 4
              ? "location"
              : "warehouse"
          }','${fields.description}','${fields.itemId}')`
        );
        break;

      default:
        console.error("Error In Creation of Location");
        break;
    }

    res.status(200).send("Location Created");
  },
};
