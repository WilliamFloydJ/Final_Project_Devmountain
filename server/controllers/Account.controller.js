require("dotenv").config();
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
      .query(`SELECT * FROM USERS WHERE email = '${email}';`)
      .then((seq) => {
        if (seq[0].length > 0) {
          const { user_id, email, subscription_plan } = seq[0][0];

          if (bcrypt.compareSync(password, seq[0][0].password)) {
            req.session.user = {
              id: user_id,
              email: email,
              password: seq[0][0].password,
              subscription_plan: subscription_plan,
            };

            res.status(200).send(req.session.user);
          } else {
            res.send("password did not match");
          }
        } else {
          res.send("no email equals that");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400);
      });
  },
  CreateAccount: async (req, res) => {
    const { email, password, company } = req.fields;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const users = await sequelize.query(
      `SELECT * from USERS where email = '${email}';`
    );

    if (users[0].length > 0) {
      sequelize.query(
        `insert into users (password, email, subscription_plan, company_name) Values ('${hash}', '${email}', 20, '${company}');`
      );
      req.session.user = {
        id: users[0][0].user_id,
        email: users[0][0].email,
        password: users[0][0].password,
        subscription_plan: users[0][0].subscription_plan,
      };
      res.status(200).send(req.session.user);
    } else {
      res.status(400).send("User with that Email Already Exists");
    }
  },
  Session: (req, res) => {
    const session = req.session;
    res.status(200).send(session);
  },
  EmailVerify: async (req, res) => {
    const params = req.params;
    const users = await sequelize.query(
      `SELECT * from USERS where email = '${params.id}';`
    );
    res.send(users[0]);
  },
  UserList: (req, res) => {
    const session = req.session;
    sequelize
      .query(`Select * From User_Team where User_Id = '${session.user.id}'`)
      .then((seq) => {
        res.status(200).send(seq[0]);
      });
  },
  Search: async (req, res) => {
    const { query, filter } = req.query;
    const session = req.session;
    let sendData = {};
    if ("user" in session) {
      switch (filter) {
        case "company_names":
          const compLocation = await sequelize.query(
            `Select * From company_names where name = '${query}' And user_id=${session.user.id}`
          );
          const compSeq = await sequelize.query(
            `Select * From warehouse_names where parent_location = '${query} company' And user_id=${session.user.id}`
          );

          sendData.seq = compSeq;
          sendData.location = compLocation;
          sendData.type = "warehouse_names";
          res.status(200).send(sendData);
          break;

        case "warehouse_names":
          const wareLocation = await sequelize.query(
            `Select * From warehouse_names where name = '${query}' And user_id=${session.user.id}`
          );
          const wareSeq = await sequelize.query(
            `Select * From location_names where parent_location = '${query} warehouse' And user_id=${session.user.id}`
          );

          sendData.seq = wareSeq;
          sendData.type = "location_names";
          sendData.location = wareLocation;
          res.status(200).send(sendData);
          break;

        case "location_names":
          const location = await sequelize.query(
            `Select * From location_names where name = '${query}' And user_id=${session.user.id}`
          );
          const locSeq = await sequelize.query(
            `Select * From box_names where parent_location = '${query} location' And user_id=${session.user.id}`
          );

          sendData.seq = locSeq;
          sendData.type = "box_names";
          sendData.location = location;
          res.status(200).send(sendData);
          break;

        case "box_names":
          const boxLocation = await sequelize.query(
            `Select * From box_names where name = '${query}' And user_id=${session.user.id}`
          );
          const boxSeq = await sequelize.query(
            `Select * From product_names where parent_location = '${query} box' And user_id=${session.user.id}`
          );

          sendData.seq = boxSeq;
          sendData.type = "product_names";
          sendData.location = boxLocation;
          res.status(200).send(sendData);
          break;

        case "product_names":
          const proSeq = await sequelize.query(
            `Select * From ${filter} Where name='${query}' AND user_id=${session.user.id}`
          );
          sendData.location = proSeq;
          res.status(200).send(sendData);
          break;
      }
    } else {
      res.status(200).send("reload");
    }
  },
  LocationCheck: async (req, res) => {
    const { location } = req.params;

    const locArr = location.split("@");

    console.log(locArr.length);
    let seq;

    switch (locArr.length) {
      case 1:
        seq = await sequelize.query(
          `Select * from company_names where name='${locArr[0]}'`
        );
        break;
      case 2:
        seq = await sequelize.query(
          `Select * from warehouse_names where name='${locArr[1]}' AND parent_location='${locArr[0]}'`
        );
        break;
      case 3:
        seq = await sequelize.query(
          `Select * from location_names where name='${locArr[2]}' AND parent_location='${locArr[1]}'`
        );
        break;
      case 4:
        seq = await sequelize.query(
          `Select * from box_names where name='${locArr[3]}' AND parent_location='${locArr[2]}'`
        );
        break;
      case 5:
        seq = await sequelize.query(
          `Select * from product_names where name='${locArr[4]}' AND parent_location='${locArr[3]}'`
        );
        break;
      default:
        seq = "Something Went Wrong";
        break;
    }
    if (seq[0].length > 0) {
      res.status(200).send(true);
    } else if (seq[0].length === 0) {
      res.status(200).send(false);
    } else {
      res.send(seq);
    }
  },
};
