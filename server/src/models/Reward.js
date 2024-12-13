import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rewardsAllocated: { type: Number, required: true },
    rewardsClaimed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Reward", rewardSchema);
