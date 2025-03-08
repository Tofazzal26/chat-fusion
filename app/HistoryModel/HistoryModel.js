import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  answer: [
    {
      title: { type: String, required: true },
      content: { type: mongoose.Schema.Types.Mixed, default: null },
    },
  ],
  question: {
    type: Object,
    required: true,
  },
});

const HistoryModel =
  mongoose.models.history || mongoose.model("history", historySchema);

export default HistoryModel;
