const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfPreparation: {
    type: Date,
    required: true,
    default: new Date(),
  },
  price: {
    type: Number,
    required: true,
  },
  new: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model("Products", productsSchema);