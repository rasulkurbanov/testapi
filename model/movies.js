const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  genre: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  numberInStock: Number,
  dailyRentalRate: Number,
  __v: Number
})

const Movies = mongoose.model('Movies', movieSchema)

module.exports = Movies