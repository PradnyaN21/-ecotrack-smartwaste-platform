const mongoose = require('mongoose');

const pickupRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    wasteCategory: {
      type: String,
      required: [true, 'Waste category is required'],
      enum: ['Plastic', 'Paper', 'Organic', 'E-Waste', 'Glass', 'Metal', 'General Waste'],
    },
    quantity: {
      type: String,
      required: [true, 'Estimated quantity is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Pickup address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    locality: {
      type: String,
      trim: true,
      default: '',
    },
    pickupDate: {
      type: String,
      required: [true, 'Pickup date is required'],
    },
    pickupTime: {
      type: String,
      required: [true, 'Pickup time is required'],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Scheduled', 'Assigned', 'Picked Up', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
