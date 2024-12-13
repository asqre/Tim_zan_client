import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transactionType: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
