const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Clothing" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Orders", orderSchema);
