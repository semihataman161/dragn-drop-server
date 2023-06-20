const mongoose = require('mongoose');
const { Schema } = mongoose;

const Website = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    description: {
      type: String,
    },
    // TODO: Add logo to websites
    // logo: {
    //   type: String,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Websites', Website);
