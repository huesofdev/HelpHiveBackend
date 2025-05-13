const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./configs/server.config");
const dbConnector = require("./configs/db.config");
const apiRouter = require("./routes");

const app = express();

//for parsing the req body into 3 different formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "ok",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is Started on Port: ${PORT}`);
  await dbConnector.connect();
});
