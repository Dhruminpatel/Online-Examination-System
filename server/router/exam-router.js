const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam-controller');

router.route('/').get(examController.home);
//examdetail
router
  .route('/examlist')
  .post(examController.addexam)
  .get(examController.agetexams);
router.route('/examlist/:examId').get(examController.getExamById);
router.route('/examlist/:examId').delete(examController.deleteExam); // Add this DELETE route
router.route('/examlist/:examId').put(examController.updateexam);

//questiondetails
router
  .route('/questionlist')
  .post(examController.questionlist)
  .get(examController.agetquestions);
router.route('/questionlist/:examId').get(examController.getQuestionsByExamId);
router
  .route('/questionlist/:questionId')
  .delete(examController.deletequestions);
router.route('/questionlist/:questionId').put(examController.updatequestion);

//userattempts details
router
  .route('/userattempts')
  .post(examController.userattempts)
  .get(examController.getattempts);
router
  .route('/userattempts/:attemptId') // :attemptId is the parameter
  .put(examController.updateuserattempts);

router.route('/userattempts/:attemptId').get(examController.getAttemptById);

//userresult
// router
//   .route('/userresults')
//   .post(examController.userResult)
//   .get(examController.getuseresults);
router.put('/results/:attemptId', examController.generateResult);
// router
//   .route('/userresults/:useresponse')
//   .get(examController.putuserresponseById);

module.exports = router;
