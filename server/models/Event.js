const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: [
        "Technical",
        "Cultural",
        "Sports",
        "Workshop",
        "Hackathon",
        "Seminar"
      ],
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    organizer: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    image: {
      type: String,
      default: ""
    },

    registrationDeadline: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", eventSchema);
