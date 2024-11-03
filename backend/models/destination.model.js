import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  });


const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    experiences: [experienceSchema],
    
}, {
    timestamps: true // createdAt, updatedAt
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;