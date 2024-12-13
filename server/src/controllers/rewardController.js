import Reward from "../models/Reward.js";
import User from "../models/User.js";

export const calculateRewards = async (req, res) => {
  const { periodTimestamp, rewardPool } = req.body;

  try {
    const scores = await Score.find({ periodTimestamp });

    // Calculate reward for each player
    for (const score of scores) {
      const { userId, score: playerScore } = score;
      const totalScores = scores.reduce(
        (total, score) => total + score.score,
        0
      );
      const reward = (playerScore / totalScores) * rewardPool;

      await Reward.findOneAndUpdate(
        { userId },
        { $set: { rewardsAllocated: reward } },
        { upsert: true }
      );
    }

    res.status(200).send({
      success: true,
      message: "Rewards calculated and allocated.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const claimReward = async (req, res) => {
  const { userId } = req.body;

  try {
    const reward = await Reward.findOne({ userId });
    if (reward && reward.rewardsAllocated > reward.rewardsClaimed) {
      // Interact with smart contract to mint and transfer tokens
      const claimedAmount = reward.rewardsAllocated - reward.rewardsClaimed;
      await Reward.findOneAndUpdate(
        { userId },
        { $inc: { rewardsClaimed: claimedAmount } }
      );

      // Log the transaction
      res.status(200).send({
        success: true,
        message: "Reward claimed successfully.",
        claimedAmount,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "No rewards available or already claimed.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
