const mongoose = require("mongoose");

const speechScheema = new mongoose.Schema({
  speechTitle: {
    type: String,
    required: true
  },
  speechText: {
    type: String,
    required: true
  },
  speechAuthor: {
    type: String,
    required: true
  },
  speechDate: {
    type: Date,
    required: true
  }
});

module.exports = Speech = mongoose.model("speech", speechScheema);
