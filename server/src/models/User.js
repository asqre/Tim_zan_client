import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true }, // Telegram ID
    walletAddress: { type: String, required: true },
    currentCurrencyBalance: { type: Number, default: 0 },
    cumulativeScores: { type: Number, default: 0 },
    cumulativeRewards: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
