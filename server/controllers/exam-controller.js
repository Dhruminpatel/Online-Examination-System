//publickey-bndgngyo
//privatekey-db929fab-bad8-41a1-9948-9380e4513996
const Exam = require('../models/exam');
const Questions = require('../models/questions');
const Attempts = require('../models/attempt');
const Results = require('../models/result');
// const { options } = require('../router/exam-router');

const home = async (req, res) => {
  try {
    return res.status(200).send({ message: 'Welcome to the Exam Home Page' });
  } catch (error) {
    return res.status(500).json({ message: 'Error loading home page' });
  }
};

const addexam = async (req, res) => {
  try {
    const newExam = await Exam.create(req.body);
    return res
      .status(201)
      .json({ message: 'Exam created successfully', newExam });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating exam', error });
  }
};

const agetexams = async (req, res) => {
  try {
    const fetchexamdetails = await Exam.find({});
    const fetchedexams = await Exam.countDocuments();
    return res.status(200).json({ fetchedexams, fetchexamdetails });
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching exams' });
  }
};

const updateexam = async (req, res) => {
  try {
    const { examId } = req.params;
    const changedexamdata = req.body;
    console.log(` examdata are ${changedexamdata} and exam ID is  ${examId}`);
    const exam = await Exam.findByIdAndUpdate(examId, changedexamdata, {
      new: true,
    });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json(exam);
  } catch (error) {
    console.log('error in updating the exams ');
    return res.status(400).json({ message: 'error in updating the exams' });
  }
};

const updatequestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const changedquestiondata = req.body;
    console.log(` and question ID is  ${questionId}`);
    const question = await Questions.findByIdAndUpdate(
      questionId,
      changedquestiondata,
      {
        new: true,
      }
    );
    if (!question) {
      return res.status(404).json({ message: 'question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.log('error in updating the questions ');
    return res.status(400).json({ message: 'error in updating the questions' });
  }
};

const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;
    console.log('examid id is ', examId);
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    return res.status(200).json(exam);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching exam' });
  }
};

const questionlist = async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body);
    await Exam.findByIdAndUpdate(req.body.examId, {
      $push: { questions: newQuestion._id },
    });
    return res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding question' });
  }
};

const agetquestions = async (req, res) => {
  try {
    const questiondetails = await Questions.find({});
    const questions = await Questions.countDocuments();
    console.log(questiondetails, questions);
    return res.status(200).json({ questions, questiondetails });
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching questions', error });
  }
};

const getQuestionsByExamId = async (req, res) => {
  try {
    const { examId } = req.params;
    console.log('examid for the question is ', examId);
    const questions = await Questions.find({ examId: examId });
    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: 'No questions found for this exam' });
    }
    if (!questions) {
      res.status(404).json({ message: 'failed to find hte questions' });
    }
    //return all the necessary value to the userside
    return res.status(200).json({
      questions,
      // questionID: questions._id,
      // examID: questions.examId,
      // questiontitle: questions.question,
      // examoptions: questions.options,
      // correctOptions: questions.correctOption,
      // marks: questions.marks,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error fetching questions by exam ID' });
  }
};

const userattempts = async (req, res) => {
  try {
    const { userId, examId, attemptNumber } = req.body;
    const newAttempt = await Attempts.create({
      userId: userId,
      examId: examId,
      attemptNumber: attemptNumber,
      startTime: new Date(), // Set the start time of the attempt
      isSubmitted: false, // The exam is not yet submitted
      answers: [], // Initially no answers
      score: 0,
    });
    return res.status(201).json({
      message: 'Exam attempt started',
      attemptId: newAttempt._id, // to display the new userattempt id for justification
      newAttempt,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error starting exam attempt' });
  }
};

const updateuserattempts = async (req, res) => {
  try {
    const { answers, score, endTime } = req.body;
    const { attemptId } = req.params; // ✅ Get attemptId from URL instead of req.body

    if (
      !attemptId ||
      !Array.isArray(answers) ||
      score === undefined ||
      !endTime
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the existing attempt by attemptId
    const existingAttempt = await Attempts.findById(attemptId);
    if (!existingAttempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Update attempt details
    existingAttempt.answers = answers;
    existingAttempt.score = score;
    existingAttempt.endTime = endTime;
    existingAttempt.isSubmitted = true;

    const updatedAttempt = await existingAttempt.save();
    const result = await generateResult(attemptId);
    return res.status(200).json({
      message: 'Attempt updated successfully',
      attemptId: updatedAttempt._id,
      updatedAttempt,
      result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating exam attempt' });
  }
};

const getattempts = async (req, res) => {
  try {
    const attempts = await Attempts.find(); //.populate('examId');
    return res.status(200).json(attempts);
  } catch (error) {
    return res.status(400).json({ message: 'Error fetching all get attempts' });
  }
};

const getAttemptById = async (req, res) => {
  try {
    const { attemptId } = req.params;
    console.log('attempt id is ', attemptId);
    const attempt = await Attempts.findById(attemptId); //.populate({
    //   path: 'examId', // populate Exam details
    //   populate: {
    //     path: 'questions', // from Exam, populate its questions
    //   },
    // });
    console.log(attempt);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    return res.status(200).json({
      attemptId: attempt._id,
      examId: attempt.examId._id,
      // examName: attempt.examId.examname,
      userId: attempt.userId,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error fetching attempt using AttemptID' });
    // throw new Error(Error);
  }
};

const generateResult = async attemptId => {
  console.log('generate result is called with the attemptID', attemptId);
  try {
    // Step 1: Fetch the attempt and related exam details
    const attempt = await Attempts.findById(attemptId).populate('examId');
    if (!attempt) {
      return res.status(400).json({ message: 'attempt id not found' });
      // throw new Error('Attempt not found');
    }

    // Step 2: Calculate the time taken by the user
    const timeDifference =
      new Date(attempt.endTime) - new Date(attempt.startTime);
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Step 3: Fetch exam details (total marks, passing marks)
    const exam = attempt.examId;
    const totalMarks = exam.totalMarks;
    const passingMarks = exam.passingmarks;

    // Step 4: Calculate the percentage and pass/fail status
    const percentage = (attempt.score / totalMarks) * 100;
    const passed = attempt.score >= passingMarks;

    // Step 5: Create the result document
    const result = new Results({
      userId: attempt.userId,
      examId: exam._id,
      attemptId: attempt._id,
      marksobtained: attempt.score,
      totalMarks: totalMarks,
      passingmarks: passingMarks,
      percentage: percentage,
      passed: passed,
      timetaken: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
    });

    // Step 6: Save the result in the database
    const savedResult = await result.save();

    return savedResult;
  } catch (error) {
    console.error(error);
    throw new Error('Error generating result');
  }
};

const putuserresponseById = async (req, res) => {
  console.log('this is get user results');
};

// exam-controller.js
const deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;

    // Try to find and delete the exam by ID
    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    return res.status(200).json({
      message: 'Exam deleted successfully',
      deletedExam,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting exam' });
  }
};

//delete Questions
const deletequestions = async (req, res) => {
  try {
    const { questionId } = req.params;
    // console.log('deleting queastion id is ', questionId);
    if (!questionId) {
      return res.status(400).json({ message: 'Question ID is required.' });
    }

    // Try to find and delete the exam by ID
    const deletedQuestion = await Questions.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    return res.status(200).json({
      message: 'Questions deleted successfully',
      deletedQuestion,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting Questions', error });
  }
};

module.exports = {
  home,
  addexam,
  agetexams,
  getExamById,
  questionlist,
  agetquestions,
  getQuestionsByExamId,
  userattempts,
  getattempts,
  updateuserattempts,
  getAttemptById,
  deleteExam,
  updatequestion,
  // userResult,
  // getuseresults,
  updateexam,
  deletequestions,
  generateResult,
  putuserresponseById,
};
