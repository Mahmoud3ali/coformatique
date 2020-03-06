const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  parentMessageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "message",
    required: true
  },

  body: { type: String, required: false },

  createdAt: { type: Date, default: () => new Date(), required: true }
});

module.exports = User = mongoose.model("reply", ReplySchema);
