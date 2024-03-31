const express = require("express");
const {
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  addBooking,
} = require("../controller/bookingcontroller.js");

const route = express.Router();

route.get("/", getAllBooking);
route.get("/:id", getBooking);
route.put("/:id", updateBooking);
route.delete("/:id", deleteBooking);
route.post("/", addBooking);

module.exports = route;
