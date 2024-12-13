import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import scoreRoutes from "../src/routes/scoreRoutes.js";
import rewardRoutes from "../src/routes/rewardRoutes.js";
import transactionRoutes from "../src/routes/transactionRoutes.js";

// configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/scores", scoreRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/transactions", transactionRoutes);

//rest api
app.get("/", (req, res) => {
  res.status(200).send(`
    <h1>Welcome to Crypto Game Server</h1>
  `);
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} at ${PORT}`.bgCyan.white
  );
});
