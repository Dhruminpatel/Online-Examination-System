const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
  examname: { type: String, require: true },
  description: { type: String, require: true },
  subject: { type: String, require: true },
  duration: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
  },
  totalMarks: { type: Number },
  passingmarks: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'userinputs' }, // set admin id in referncereq.accepts(types);
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, //by default active and can be inactive at any time by the admin
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'questions' }], //add only the question ID
  maxAttempts: { type: Number, default: 1 },
});

const ExamS = new mongoose.model('Exams', ExamSchema);

module.exports = ExamS;
