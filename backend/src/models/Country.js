const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    slug: { 
      type: String, 
      unique: true, 
      required: true 
    },
    intro: String,
    history: String,
    flagUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", CountrySchema);
