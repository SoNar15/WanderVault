import express from "express";

// import mongoose from "mongoose";



import { getDestinations, addDestination, updateDestination, deleteDestination } from "../controllers/destination.controllers.js";


const router = express.Router();


router.get("/", getDestinations);

router.post("/", addDestination);

router.delete("/:id", deleteDestination);

router.put("/:id", updateDestination);

export default router;