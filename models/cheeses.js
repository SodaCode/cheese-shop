const mongoose = require("mongoose");

const cheeseSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Cheese", cheeseSchema);
