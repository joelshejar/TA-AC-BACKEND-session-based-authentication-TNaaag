
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var comment = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    like:{type: String, default:0},
    aticleId: { type: Schema.Types.ObjectId, ref: "Article" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment' , comment);