import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["Books", "Electronics", "Furniture", "Clothing", "Cycles", "Stationery", "Other"],
      default: "Other",
    },
    condition: { type: String, enum: ["New", "Like New", "Good", "Fair"], default: "Good" },
    imageUrl: { type: String, default: "" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isSold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

listingSchema.index({ title: "text", description: "text" });

export default mongoose.model("Listing", listingSchema);
