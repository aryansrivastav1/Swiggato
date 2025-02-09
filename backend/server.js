import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"

// App configuration
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working.");
});

app.listen(port, () => {
  console.log(`Server is working at port ${port}.`);
});
