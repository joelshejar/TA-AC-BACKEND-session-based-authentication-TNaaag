var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var item = new Schema(
  {
    name: { type: String, required: true },
    quantityOfProduct: { type: Number, required: true },
    price: { type: Number, required: true },
    adminId: {type: Schema.Types.ObjectId , ref: 'Users'},
    likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Item' , item);