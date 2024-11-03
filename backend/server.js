import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import destinationRoutes from "./routes/destination.route.js";

// import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());   // Allows to accept json data in body

app.use(cors()); 

app.use("/api/destinations", destinationRoutes);

app.listen((PORT), () => {
    connectDB();
    console.log("Server running at http://localhost:"+PORT);
});



// console.log(process.env.MONGODB_URI)
