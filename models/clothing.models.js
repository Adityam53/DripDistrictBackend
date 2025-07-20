const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountOffered: {
    type: Number,
  },
  availableSizes: [
    {
      type: String,
      required: true,
    },
  ],
  description: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Clothing = mongoose.model("Clothing", clothingSchema);
module.exports = Clothing;
