const mongoose = require("mongoose");
require("dotenv").config();

const dbUri = process.env.MONGODB;
const initializeDatabase = async () => {
  await mongoose
    .connect(dbUri)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) =>
      console.log("An error occured while connecting to the database!", error)
    );
};

module.exports = { initializeDatabase };
