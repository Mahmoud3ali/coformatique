const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  title: { type: String, required: true },

  body: { type: String, required: false },

  createdAt: { type: Date, default: () => new Date(), required: true }
});

module.exports = User = mongoose.model("message", MessageSchema);
