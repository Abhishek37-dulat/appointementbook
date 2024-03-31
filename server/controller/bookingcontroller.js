const Booking = require("../models/booking.js");
const { v4: uuidv4 } = require("uuid");

const getAllBooking = (req, res, next) => {
  Booking.findAll()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const getBooking = (req, res, next) => {
  Booking.findById(req.params.id).then((result) => {
    console.log(result);
    res.send(result);
  });
};

const updateBooking = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  Booking.findByPk(req.params.id)
    .then((book) => {
      book.username = username;
      book.email = email;
      book.phone = phone;
      return book.save();
    })
    .then((result) => {
      console.log("UPDATED Booking!");
      res.send(result);
    })
    .catch((err) => console.log("UPDATE: ", err));
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    await booking.destroy();
    res.send(booking);
  } catch (err) {
    res.send(err);
  }
};

const addBooking = (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  // const uid = uuidv4();
  // console.log(uid);
  Booking.create({
    username: username,
    email: email,
    phone: phone,
  })
    .then((result) => {
      // console.log(result);
      console.log("Booked");
      res.send(result);
    })
    .catch((err) => {
      console.log("ADDING:  ", err);
      res.send(err);
    });
};

module.exports = {
  getAllBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  addBooking,
};
