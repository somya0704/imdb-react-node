const mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  name:{
    type: String,
    required: true  
  },
  year:{
    type: Number,
    required: true
  },
  plot:{
    type: String,
  },
  poster: String,
  actors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor'
  }]
});



module.exports = mongoose.model('Movie', movieSchema)