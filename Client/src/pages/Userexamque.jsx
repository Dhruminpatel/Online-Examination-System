// import '../style/userexamque.css';
// import { useEffect, useState } from 'react';
// import { Header } from './Header';
// import { Footer } from './footer';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ExamSidebar } from '../components/examsidebar';
// import { ExamQue } from '../components/examque';
// export const Userque = () => {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]); // ✅ Ensure questions is an array
//   const [activeQue, setActiveQue] = useState(0); // ✅ Default to first question

//   useEffect(() => {
//     if (!attemptId) {
//       navigate('/login', { replace: true });
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         // ✅ Fetch attempt details
//         const attemptResponse = await fetch(
//           `http://localhost:5000/api/exam/userattempts/${attemptId}`,
//           {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );
//         const attemptData = await attemptResponse.json();
//         if (!attemptResponse.ok) {
//           console.log(
//             'Error fetching attempt details:',
//             attemptResponse.statusText
//           );
//           return;
//         }

//         // ✅ Extract examId from attempt data
//         const examId = attemptData.examId;

//         // ✅ Fetch question list using examId
//         const questionDetails = await fetch(
//           `http://localhost:5000/api/exam/questionlist/${examId}`,
//           {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           }
//         );

//         const questionData = await questionDetails.json();
//         if (!questionDetails.ok) {
//           console.log('Error fetching questions:', questionDetails.statusText);
//           return;
//         }

//         // ✅ Ensure the questions array is set
//         setQuestions(questionData.questions || []);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, [attemptId, navigate]);

//   // ✅ Get the currently active question
//   // const activeQuestion = questions[activeQue] || {};

//   return (
//     <>
//       <Header />
//       <h2 className='mainheading'>
//         Exam Attempt ID: {attemptId} - Question {activeQue + 1}
//       </h2>

//       <div className='flex'>
//         <ExamSidebar
//           questions={questions}
//           activeque={activeQue}
//           setactiveque={setActiveQue}
//         />
//         <ExamQue
//           questions={questions}
//           activeque={activeQue}
//           setActiveQue={setActiveQue}
//         />
//       </div>

//       <Footer />
//     </>
//   );
// };

import '../style/userexamque.css';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './footer';
import { useParams, useNavigate } from 'react-router-dom';
import { ExamSidebar } from '../components/examsidebar';
import { ExamQue } from '../components/examque';
const BackendAPI = import.meta.env.VITE_API_BACKENDURL;

export const Userque = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [activeQue, setActiveQue] = useState(0);
  const [examdata, setExamdata] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!attemptId) {
      navigate('/login', { replace: true });
      return;
    }

    const fetchQuestions = async () => {
      try {
        const attemptResponse = await fetch(
          `${BackendAPI}/api/exam/userattempts/${attemptId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const attemptData = await attemptResponse.json();
        if (!attemptResponse.ok) {
          console.log(
            'Error fetching attempt details:',
            attemptResponse.statusText
          );
          return;
        }
        setUserId(attemptData.userId);

        const examId = attemptData.examId;

        const examDetails = await fetch(
          `${BackendAPI}/api/exam/examlist/${examId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const examData = await examDetails.json();
        if (!examDetails.ok) {
          console.log('Error fetching questions:', examDetails.statusText);
          return;
        }
        setExamdata(examData);

        const questionDetails = await fetch(
          `${BackendAPI}/api/exam/questionlist/${examId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const questionData = await questionDetails.json();
        if (!questionDetails.ok) {
          console.log('Error fetching questions:', questionDetails.statusText);
          return;
        }

        setQuestions(questionData.questions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [attemptId, navigate]);

  return (
    <>
      <Header />
      <h2 className='mainheadingg'>Exam Name: {examdata.examname}</h2>
      <div className='flex '>
        {/* Sidebar Component */}

        <ExamSidebar
          questions={questions}
          activeQue={activeQue}
          setActiveQue={setActiveQue}
        />
        {/* Exam Question Section */}
        <ExamQue
          questions={questions}
          activeQue={activeQue}
          setActiveQue={setActiveQue}
          examdata={examdata}
          userId={userId}
        />
      </div>
      {/* <div className='duration'>the exam duration is {examdata.duration}</div> */}
      <Footer />
    </>
  );
};
