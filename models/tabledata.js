const mongoose = require("mongoose");

const tableDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogContent: {
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
  author: {
    type: String,
    required: true,
  },
});

const TableData = mongoose.model("TableData", tableDataSchema);

module.exports = TableData;
