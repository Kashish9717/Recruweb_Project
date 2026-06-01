import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    company: {
      type: String
    },

    message: {
      type: String
    },

    source: {
      type: String,
      default: "Website Form"
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Follow-up", "Closed"],
      default: "New"
    }
  },
  {
    timestamps: true
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;