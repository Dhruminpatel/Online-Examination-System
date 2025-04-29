// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Exams' },
  question: { type: String },
  options: {
    A: { type: String },
    B: { type: String },
    C: { type: String },
    D: { type: String },
  },
  correctOption: { type: String },
  marks: { type: Number },
});

const QuestionS = new mongoose.model('questions', QuestionSchema);
module.exports = QuestionS;
