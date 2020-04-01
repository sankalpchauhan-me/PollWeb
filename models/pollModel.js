const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A poll must have a name']
  },
  author: String,
  options: [String],
  votes: [Number],
  users_voted: [String],
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', PollSchema);
