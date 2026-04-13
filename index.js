import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Utils/DB.js";
import urlRoutes from "./Routes/urls.js";
dotenv.config();

connectDB();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
