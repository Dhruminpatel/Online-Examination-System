import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const BackendAPI = import.meta.env.VITE_API_BACKENDURL;

export const ExamQue = ({
  questions,
  activeQue,
  setActiveQue,
  userId,
  examdata,
}) => {
  // Initialize state variables
  const [useranswer, setuseranswer] = useState({});
  const [showModal, setShowModal] = useState(false); // Success modal visibility
  const [timeleft, settimeleft] = useState(0); // Time left for the exam
  const [showConfirmationModal, setshowConfirmationModal] = useState(false); // Confirmation modal visibility
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if exam is already submitted
  const { attemptId } = useParams();

  // Get the active question based on the activeQue index
  const activeQuestion = questions[activeQue] || {};

  // Default time duration from exam data (in seconds)
  const defaultime = () => {
    if (!examdata || !examdata.duration) {
      console.log('Failed to load exam duration');
      return 0;
    }
    const { hours = 0, minutes = 0, seconds = 0 } = examdata.duration;
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Format the time left in a readable format (hours:minutes:seconds)
  const formattedtime = () => {
    const hours = Math.floor(timeleft / 3600);
    const minutes = Math.floor((timeleft % 3600) / 60);
    const seconds = timeleft % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Handle user answer selection
  const userSelectedAns = async (userquestionID, keyresposneId) => {
    if (isSubmitted) return; // Prevent selecting answers if already submitted
    setuseranswer(previousans => ({
      ...previousans,
      [userquestionID]: keyresposneId,
    }));
  };

  // Move to the next question
  const handlenextquestion = async () => {
    if (activeQue < questions.length - 1) {
      setuseranswer(previous => ({
        ...previous,
        [activeQuestion._id]: previous[activeQuestion._id] || null,
      }));
      setActiveQue(prev => prev + 1);
    }
  };

  // Move to the previous question
  const previousquestion = async () => {
    if (activeQue > 0) {
      setuseranswer(previousvalue => ({
        ...previousvalue,
        [activeQuestion._id]: previousvalue[activeQuestion._id] || null,
      }));
      setActiveQue(prev => prev - 1);
    }
  };

  // Check if the exam is completed (i.e., all questions answered)
  const isExamCompleted = () => {
    return Object.keys(useranswer).length === questions.length;
  };

  // Submit exam logic
  const submitexam = async () => {
    if (isSubmitted) return; // Prevent duplicate submission
    if (!isExamCompleted()) {
      setshowConfirmationModal(true); // Show confirmation modal if exam is not complete
    } else {
      await handleSubmitExam(); // Proceed with submitting the exam
    }
  };

  // Submit the exam and store the results
  const handleSubmitExam = async () => {
    try {
      let score = 0;
      const userresponse = questions.map(question => {
        const userSelectedOption = useranswer[question._id] || null;
        const correctOption = question.correctOption;
        const isCorrect = userSelectedOption === correctOption;

        if (isCorrect) {
          score += question.marks; // Add marks for correct answers
        }

        return {
          questionId: question._id,
          selectedOption: userSelectedOption,
          correctOptions: correctOption,
          isCorrect: isCorrect,
        };
      });

      // Prepare user submission data
      const endTime = new Date();
      const userSubmitexam = {
        startTime: new Date(),
        endTime: endTime,
        isSubmitted: true,
        score: score,
        answers: userresponse,
      };

      // Send the submission data to the server
      const updateresponse = await fetch(
        `${BackendAPI}/api/exam/userattempts/${attemptId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userSubmitexam),
        }
      );
      const savedata = await updateresponse.json();

      if (!updateresponse.ok) {
        console.log('Error at storing the exam value in the collections');
      }

      console.log('Attempt saved to the collections', savedata);

      setShowModal(true); // Show success modal after submission
      setIsSubmitted(true); // Mark as submitted to prevent resubmission
      return;
    } catch (error) {
      console.log('Error in submitting the exam:', error);
    }
  };

  // Handle user response to the confirmation modal
  const handleConfirmSubmission = async confirm => {
    if (confirm) {
      await handleSubmitExam();
    }
    setshowConfirmationModal(false); // Close modal after response
  };

  // Timer with auto-submit
  const timerautosubmit = () => {
    const initialTime = defaultime();
    settimeleft(initialTime); // Initialize the timer

    const timer = setInterval(() => {
      settimeleft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          submitexam(); // Auto-submit only if not already submitted
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  // Fetch attempt status when component mounts
  useEffect(() => {
    const fetchAttemptStatus = async () => {
      try {
        const res = await fetch(
          `${BackendAPI}/api/exam/userattempts/${attemptId}`
        );
        const data = await res.json();
        if (data.isSubmitted) {
          setIsSubmitted(true);
          setShowModal(true);
          setuseranswer(
            data.answers.reduce((acc, curr) => {
              acc[curr.questionId] = curr.selectedOption;
              return acc;
            }, {})
          );
        }
      } catch (error) {
        console.log('Error fetching attempt status:', error);
      }
    };

    fetchAttemptStatus();
  }, [attemptId]);

  // Start timer only if exam not submitted
  useEffect(() => {
    if (!isSubmitted) {
      const cleantimer = timerautosubmit();
      return cleantimer;
    }
  }, [examdata, isSubmitted]);

  return (
    <>
      <div className='examquemain'>
        <div className='flex items-center justify-between'>
          <div className='examquenum'>
            <h2>Question {activeQue + 1}</h2>
          </div>
          <div>
            <span className='examtime'>Durations: </span>
            <span className='timecounting'>{formattedtime()}</span>
          </div>
        </div>
        <p className='examque'>
          {activeQuestion.question || 'Loading question...'}
        </p>

        {/* Display answer options */}
        <div className='mt-4'>
          {activeQuestion.options && (
            <ul className='ml-5 list-disc'>
              {Object.entries(activeQuestion.options).map(([key, value]) => (
                <li key={key} className='list-none'>
                  <input
                    type='radio'
                    name='answer'
                    id={key}
                    checked={useranswer[activeQuestion._id] === key}
                    onChange={() => userSelectedAns(activeQuestion._id, key)}
                    disabled={isSubmitted} // Disable selection if already submitted
                  />
                  <label htmlFor={key} className='ml-2 text'>
                    {value}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Question Navigation Buttons */}
        <div className='flex items-end justify-between mt-auto exambuttons'>
          {activeQue > 0 && (
            <div className='previousbutton'>
              <button className='previousquestion' onClick={previousquestion}>
                Previous
              </button>
            </div>
          )}
          <div className='ml-auto nextquestion'>
            {activeQue < questions.length - 1 ? (
              <button className='nextquebutton' onClick={handlenextquestion}>
                Next Question
              </button>
            ) : (
              <button
                className='examsubmitutton'
                onClick={submitexam}
                disabled={isSubmitted}
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className='onsubmitexam'>
          <div className='examsubmitmsg'>
            <h2 className='text-2xl font-bold text-center text-green-600'>
              Exam Submitted Successfully!
            </h2>
            <p className='mt-2 text-center'>Your exam has been saved.</p>
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded'
                onClick={() => (window.location.href = '/home')}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for unanswered questions */}
      {showConfirmationModal && (
        <div className='onsubmitexam'>
          <div className='examsubmitmsg'>
            <h2 className='text-2xl font-bold text-center text-red-600'>
              Are you sure you want to submit the exam before answering all
              questions?
            </h2>
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 mr-4 text-white bg-red-500 rounded'
                onClick={() => handleConfirmSubmission(true)}
              >
                Yes, Submit
              </button>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded'
                onClick={() => handleConfirmSubmission(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
