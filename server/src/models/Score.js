import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: { type: Number, required: true },
  scoreType: { type: String, required: true },
  periodTimestamp: { type: Date, required: true },
});

export default mongoose.model("Score", scoreSchema);
