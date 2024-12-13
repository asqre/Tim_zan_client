import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const processPurchase = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    // Interact with the payment smart contract (assuming successful transaction)
    await User.findOneAndUpdate(
      { userId },
      { $inc: { currentCurrencyBalance: amount } }
    );

    // Log the transaction
    const transaction = new Transaction({
      userId,
      transactionType: "Purchase",
      amount,
    });
    await transaction.save();

    res.status(200).send({
      success: true,
      message: "In-game currency purchase successful.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
