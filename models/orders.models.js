const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Clothing" },
      title: String,
      imageUrl: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  address: String,
  placedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Orders", orderSchema);
