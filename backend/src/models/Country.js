const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true, required: true },
    intro: String,
    history: String,
    language: [{ phrase: String, meaning: String }],
    exploration: {
      activities: [
        {
          title: String,
          description: String,
          imageURL: String,
          liked: { type: Boolean, default: false },
        },
      ],
      // food: [String],
      // events: [String],
    },
    // images: [{ url: String, caption: String }],
    flagUrl: String,
    // moreInfo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
