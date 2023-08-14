const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const winnerSchema = new Schema(
  {
    winnerName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("winner", winnerSchema);
