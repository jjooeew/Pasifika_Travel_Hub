const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
    countrySlug: { type: String, required: true },  // denormalized for easy lookups
    countryName: { type: String },                  // optional, handy for search/display
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    locationLabel: { type: String, default: "" },
    tags: [{ type: String }],

    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },

    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Activity", ActivitySchema);
