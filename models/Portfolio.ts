import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    theme: {
      type: String,
      default: "modern-dark",
    },
    customizations: {
      primaryColor: { type: String, default: "#3b82f6" },
      secondaryColor: { type: String, default: "#1e40af" },
      fontFamily: { type: String, default: "Inter" },
      showGithub: { type: Boolean, default: true },
      showLinkedin: { type: Boolean, default: true },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
