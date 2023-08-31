const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commenter: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "publish"],
    required: true,
  },
  publishOn: {
    type: String,
    required: true,
  },
});

const CommentsData = mongoose.model("CommentsData", commentSchema);

module.exports = CommentsData;
