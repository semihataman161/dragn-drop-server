const mongoose = require('mongoose');
const { Schema } = mongoose;

const Review = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  content: {
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Reviews', Review);
