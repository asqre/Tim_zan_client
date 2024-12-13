import Score from "../models/Score.js";
import User from "../models/User.js";

export const collectScores = async (req, res) => {
  const { scores, periodTimestamp } = req.body;

  try {
    // Store scores for each user
    for (const scoreData of scores) {
      const { userId, score, scoreType } = scoreData;
      const scoreEntry = new Score({
        userId,
        score,
        scoreType,
        periodTimestamp,
      });
      await scoreEntry.save();

      // Update cumulative score for the user
      await User.findOneAndUpdate(
        { userId },
        { $inc: { cumulativeScores: score } }
      );
    }
    res.status(200).send({
      success: true,
      message: "Scores collected successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const resetScores = async (req, res) => {
  const { periodTimestamp } = req.body;

  try {
    // Reset scores in the game (e.g., by calling an external game API)

    res.status(200).send({
      success: true,
      message: "Scores reset successfully for period: " + periodTimestamp,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
