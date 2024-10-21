import express from "express";
import mongoose from "mongoose";

import Destination from "../models/destination.model.js";

export const getDestinations = async (req, res) => {
    
    try {
        const destinations = await Destination.find({});
        res.status(200).json({ success: true, data: destinations});
    } catch (error) {
    console.log("Error in fetching destinations: ", error.message);
        res.status(404).json({ success: false, message: "Server error"});
    }

};

export const addDestination = async (req, res) => {
    const destination = req.body; // Data from User

    if(!destination.name || !destination.description || !destination.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields" });
    }

    const newDestination = new Destination(destination);

    try {
        await newDestination.save();
        res.status(201).json({ success: true, data: newDestination});
    } catch (error) {
        console.log("Error in Add Destination: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
        // 500 status code is an internal server error
    }
};

export const updateDestination = async (req, res) => {
    const {id} = req.params;

    const destination = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Destination Id"});
    }
    
    try {
        const updatedDestination = await Destination.findByIdAndUpdate(id, destination, {new:true});
        // Default returns old document
        // "new" registers new data into details of that product 

        res.status(200).json({ success: true, data: updatedDestination});
    } catch (error) {
        console.log("Error in Update Destination: ", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }

};


export const deleteDestination = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Destination Id"});
    }

    try {
        await Destination.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Destination deleted"});
    } catch (error) {
        console.log("Error in Delete Product: ", error.message);
        res.status(500).json({ success: false, message: "Server eror"});
    }

};