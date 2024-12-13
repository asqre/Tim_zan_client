import express from "express";
import { processPurchase } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/purchase", processPurchase);

export default router;
