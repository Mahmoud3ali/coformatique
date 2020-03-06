const mongoose = require("mongoose");

const { USERS_MODEL } = require("./User");

const MessageSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USERS_MODEL,
    index: true,
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USERS_MODEL,
    index: true,
    required: true
  },

  title: { type: String, required: true },

  body: { type: String, required: false },

  createdAt: { type: Date, default: () => new Date(), required: true }
});

module.exports = User = mongoose.model("message", MessageSchema);
