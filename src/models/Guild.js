const { Schema, model } = require('mongoose')

const Guild = new Schema({
  _id: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true,
    default: '>'
  }
})

module.exports = model('Guild', Guild)
