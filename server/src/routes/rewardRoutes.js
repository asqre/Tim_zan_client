import express from "express";
import {
  calculateRewards,
  claimReward,
} from "../controllers/rewardController.js";

const router = express.Router();

router.post("/calculate", calculateRewards);
router.post("/claim", claimReward);

export default router;
