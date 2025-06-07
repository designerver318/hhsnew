import mongoose from "mongoose";

const AchieverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // You can store the image URL or path here
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false, // Optional if you don't want to make it mandatory
    },
  },
  {
    timestamps: true,
  }
);

const Achiever = mongoose.models.Achiever || mongoose.model("Achiever", AchieverSchema);

export default Achiever;
