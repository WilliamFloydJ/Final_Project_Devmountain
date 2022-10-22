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
            res.status(204).send("Password Did Not Match");
          }
        } else {
          res.status(204).send("No Email Equals That");
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

    if (users[0].length > 0 === false) {
      sequelize.query(
        `insert into users (password, email, subscription_plan, company_name) Values ('${hash}', '${email}', 20, '${company}');`
      );
      res.status(200).redirect("/Inventory");
    } else {
      res.status(400).send("User with that Email Already Exists");
    }
  },
  UpdatePassword: async (req, res) => {
    const { password, newPassword } = req.params;
    const seqPassword = await sequelize.query(
      `Select password from users where user_id = ${req.session.user.id}`
    );
    if (bcrypt.compareSync(password, seqPassword[0][0].password)) {
      sequelize.query(
        `update users set password = ${newPassword} where user_id = ${req.session.user.id}`
      );
      res.status(200).send("Updated Password");
    }
    res.status(204);
  },
  ItemId: async (req, res) => {
    const { itemId, description } = req.fields;

    const item = await sequelize.query(
      `Insert Into itemid_names (itemid, description, user_id) Values ('${itemId}', '${description}', ${req.session.user.id})`
    );

    res.status(200).send("ItemId Created");
  },
  ItemSearch: async (req, res) => {
    const { itemId } = req.params;

    const item = await sequelize.query(
      `Select description from itemid_names where itemid = '${itemId}'`
    );

    res.status(200).send(item);
  },
  ItemCheck: async (req, res) => {
    const { itemId } = req.params;

    console.log(req.params);

    const item = await sequelize.query(
      `Select * from itemid_names where itemid = '${itemId}' And user_id = ${req.session.user.id}`
    );

    if (item[0].length > 0) {
      res.status(200).send(false);
    } else {
      res.status(200).send(true);
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
          sendData.column = filter;
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
          sendData.column = filter;
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
          sendData.column = filter;
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
          sendData.column = filter;
          sendData.itemId = sendData.location = boxLocation;
          res.status(200).send(sendData);
          break;

        case "product_names":
          const proSeq = await sequelize.query(
            `Select * From ${filter} Where name='${query}' AND user_id=${session.user.id}`
          );
          sendData.location = proSeq;
          res.status(200).send(sendData);
          break;
        case "itemid_names":
          const idLocation = await sequelize.query(
            `Select * From ${filter} Where itemid='${query}' AND user_id=${session.user.id}`
          );
          const idSeqProduct = await sequelize.query(
            `Select * From product_names where item_name = '${query}' And user_id=${session.user.id}`
          );
          const idSeqBox = await sequelize.query(
            `Select * From box_names where item_name = '${query}' And user_id=${session.user.id}`
          );
          sendData.location = idLocation;
          sendData.column = filter;
          sendData.seqProduct = idSeqProduct;
          sendData.seqBox = idSeqBox;
          res.status(200).send(sendData);
          break;

        default:
          res.status(200);
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
  LocationTransfer: async (req, res) => {
    const { from, to } = req.params;
    let fromType;
    let toType;
    const fromLocArr = from.split("@");
    const toLocArr = to.split("@");

    switch (from.split("@").length) {
      case 2:
        fromType = "warehouse_names";
        break;

      case 3:
        fromType = "location_names";
        break;

      case 4:
        fromType = "box_names";
        break;

      case 5:
        fromType = "product_names";
        break;

      default:
        fromType = "";
        break;
    }

    switch (to.split("@").length) {
      case 1:
        toType = "company";
        break;

      case 2:
        toType = "warehouse";
        break;

      case 3:
        toType = "location";
        break;

      case 4:
        toType = "box";
        break;

      default:
        toType = "";
        break;
    }

    seq = await sequelize.query(
      `UPDATE ${fromType} SET parent_location = '${
        toLocArr[toLocArr.length - 1] + " " + toType
      }' WHERE name = '${fromLocArr[fromLocArr.length - 1]}' And user_id = ${
        req.session.user.id
      };`
    );

    res.status(200).send(fromType);
  },
  Sales: async (req, res) => {
    const {
      type,
      itemId,
      quantity,
      date,
      address,
      compName,
      shipping,
      contact,
      customer,
      weight,
      orderId,
      box,
    } = req.fields;

    switch (type) {
      case "SalesOrder":
        sequelize.query(
          `insert into sales_order(user_id, itemid, quantity, date, customer_id, closed) values(${req.session.user.id}, '${itemId}',${quantity}, '${date}', ${customer}, false)`
        );

        res.status(200).send("Finished");
        break;
      case "Delivery":
        const container = JSON.parse(box);
        console.log(container);
        for (let cont of container) {
          console.log(cont);
          contArr = cont.split("@");
          const boxId = await sequelize.query(
            `select box_names_id from box_names where name = '${
              contArr[contArr.length - 1]
            }' AND parent_location = '${contArr[contArr.length - 2]} location'`
          );

          sequelize.query(
            `insert into delivery_order_box(box_names_id, sales_order_id) values(${boxId[0][0].box_names_id}, ${orderId})`
          );
          sequelize.query(
            `Update box_names set quantity = quantity - ${quantity} where box_names_id = ${boxId[0][0].box_names_id}`
          );
        }

        sequelize.query(
          `insert into delivery_order(sales_order_id, weight, delivery_order_box_id) values(${orderId}, ${weight}, ${orderId})`
        );

        res.status(200).send("Finished");
        break;

      case "Customer":
        sequelize.query(
          `insert into customer_names(user_id, address, name, shipping, customer) values(${req.session.user.id}, '${address}','${compName}', '${shipping}', '${contact}')`
        );

        res.status(200).send("Finished");
        break;
    }
  },
  SalesQuery: async (req, res) => {
    const { type, query, filter } = req.params;

    if (type === "delivery_order") {
      if (filter === "delivery_order_id") {
        const seq = await sequelize.query(
          `Select * From delivery_order d, sales_order s where d.${filter} = '${query}' And s.user_id = ${req.session.user.id} And d.sales_order_id = s.sales_order_id;`
        );
        res.status(200).send(seq);
      } else {
        const seq = await sequelize.query(
          `Select * From delivery_order d, sales_order s where s.${filter} = '${query}' And s.user_id = ${req.session.user.id} And d.sales_order_id = s.sales_order_id;`
        );
        res.status(200).send(seq);
      }
    } else {
      const seq = await sequelize.query(
        `Select * From ${type} where ${filter} = '${query}' And user_id = ${req.session.user.id} ;`
      );
      res.status(200).send(seq);
    }
  },
};
