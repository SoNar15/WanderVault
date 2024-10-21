import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import destinationRoutes from "./routes/destination.route.js";

// import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allows to accept json data in body

app.use("/api/destinations", destinationRoutes);

app.listen((PORT), () => {
    connectDB();
    console.log("Server running at http://localhost:"+PORT);
});

// mongodb+srv://sohamnarkhedkar:Soham111@cluster0.ko7rb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// console.log(process.env.MONGODB_URI)