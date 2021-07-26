const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 3 },
  },
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

TodoSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Todo", TodoSchema);
