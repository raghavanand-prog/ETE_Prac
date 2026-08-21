import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    problemStatement: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    domain: { type: String, required: true, trim: true },
    technologies: { type: String, required: true, trim: true },
    expectedImpact: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Submitted", "Under Review", "Approved", "Prototype", "Implemented"],
      default: "Submitted"
    },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    voteCount: { type: Number, default: 0 },
    submittedBy: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Idea", IdeaSchema);