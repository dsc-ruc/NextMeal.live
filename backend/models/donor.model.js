const mongoose = require("mongoose");

const Schema = mongoose.Schema;


//{ type: {type: String}, coordinates: [Number]}
// location: { type: String, required: true},
const DonorSchema = new Schema(
  {
    name_of_restaurant: { type: String, required: true },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    address: { type: String, required: true },
    food_available_start_time: { type: String, required: true },
    food_available_end_time: { type: String, required: true },
    food_available: { type: String, required: true },
    potential_allergies: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Donor = mongoose.model("Donor", DonorSchema);

module.exports = Donor;
