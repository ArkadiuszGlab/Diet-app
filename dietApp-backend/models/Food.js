const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a food name']
  },
  calories: {
    type: String,
    required: [true, "Please enter food's calories"]
  },
  proteins: {
    type: String,
    required: [true, "Please enter food's proteins"]
  },
  carbs: {
    type: String,
    required: [true, "Please enter food's carbs"]
  },
  fats: {
    type: String,
    required: [true, "Please enter food's fats"]
  },
  barcode: {
    type: String,
    required: [true, "Please enter food's barcode"]
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
