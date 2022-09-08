const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
const formidable = require("express-formidable");

app.use(cors());
app.use(express.json());
app.use(formidable());

const PORT = 5000;

const { QrRead, QrCreate } = require("./controllers/QR.controller");

app.post("/api/QrRead", QrRead);

app.get("/api/QrCreate", QrCreate);

app.listen(PORT, () => {
  console.log(chalk.blue(`Listening on Port ${PORT}`));
});
