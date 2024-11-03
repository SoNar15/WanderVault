import express from "express";

// import mongoose from "mongoose";



import { getDestinations, addDestination, updateDestination, deleteDestination, addExperience, deleteExperience, getExperiences } from "../controllers/destination.controllers.js";
const router = express.Router();


router.get("/", getDestinations);

router.post("/", addDestination);

router.delete("/:id", deleteDestination);

router.put("/:id", updateDestination);


// New routes for experiences
router.get("/:id/experiences", getExperiences);
router.post("/:id/experiences", addExperience);

router.delete("/:id/experiences/:expId", deleteExperience); 


export default router;