const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userinputs' },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exams' },
  attemptId: { type: mongoose.Schema.Types.ObjectId, ref: 'attempts' },
  marksobtained: { type: Number },
  totalMarks: { type: Number },
  passingmarks: { type: Number },
  percentage: { type: Number },
  passed: { type: Boolean },
  timetaken: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },
});

const ResultS = new mongoose.model('results', ResultSchema);
module.exports = ResultS;
