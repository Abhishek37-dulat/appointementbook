const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database.js");
const booking = require("./routes/bookingroute.js");

const app = express();
app.use(cors());
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/booking", booking);

sequelize
  .sync()
  .then((result) => {
    // console.log("result: ", result);
    app.listen(port, () => {
      console.log("listening to port: ", port);
    });
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
