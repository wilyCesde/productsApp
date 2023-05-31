const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  product:{
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("Sale", saleSchema);