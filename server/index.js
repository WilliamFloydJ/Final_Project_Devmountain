require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const formidable = require("express-formidable");

const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
    resave: false,
    saveUninitialized: true,
    rolling: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(formidable());

const PORT = 5000;

const { QrRead, QrCreate } = require("./controllers/QR.controller");

const {
  Login,
  Session,
  UserList,
  CreateAccount,
  EmailVerify,
  Search,
  LocationCheck,
} = require("./controllers/Account.controller");

app.post("/api/QrRead", QrRead);

app.post("/api/QrCreate", QrCreate);

app.post("/api/Login", Login);

app.post("/api/CreateAccount", CreateAccount);

app.get("/api/Users", UserList);

app.get("/api/EmailVerify/:id", EmailVerify);

app.get("/api/Session", Session);

app.get("/api/InventorySearch", Search);

app.get("/api/LocationCheck/:location", LocationCheck);

app.listen(PORT, () => {
  console.log(chalk.blue(`Listening on Port ${PORT}`));
});
