const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  bio: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  // movies: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Actor'
  // }]
});

module.exports = mongoose.model('Actor', actorSchema);

