import express from "express";
import { collectScores, resetScores } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/collect", collectScores);
router.post("/reset", resetScores);

export default router;
