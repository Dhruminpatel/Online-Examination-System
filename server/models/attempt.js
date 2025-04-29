const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userinputs',
    require: true,
  },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exams', require: true },
  attemptNumber: { type: Number },
  // startTime: { type: Date, default: Date.now },
  startTime: { type: Date },
  endTime: { type: Date },
  isSubmitted: { type: Boolean, default: false },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
      },
      selectedOption: { type: String },
      correctOptions: [{ type: String }],
      isCorrect: { type: Boolean },
    },
  ],
  score: { type: Number, default: 0 },
});

const AttemptS = new mongoose.model('Attempts', AttemptSchema);

module.exports = AttemptS;
