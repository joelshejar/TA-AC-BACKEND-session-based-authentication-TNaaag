
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var cart = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    listItems: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart' , cart);