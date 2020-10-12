const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  day: String,
  end: String,
  start: String,
  startDate: Date,
  endDate: Date,
  recurring: Boolean,
  title: String,
  id: String,
});

const rateSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
});
const trainerSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePic: {
    type: String,
  },
  coverPic: {
    type: String,
  },
  timeZone: {
    type: String,
  },
  bio: {
    type: String,
  },
  settings: {
    type: Object,
    select: false,
  },
  availability: [availabilitySchema],
  minimum: Number,
  maximum: Number,
  rate: [rateSchema],
};

// needs: weekly schedule
module.exports = mongoose.model('Trainer', trainerSchema);
