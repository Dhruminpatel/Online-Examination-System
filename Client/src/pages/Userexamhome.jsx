import '../style/userhome.css';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { Footer } from './footer';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
const BackendAPI = import.meta.env.VITE_API_BACKENDURL;

export const UserexamHome = () => {
  const [exams, setExams] = useState([]); // Renamed for clarity
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (exams.length > 0) return;
    const fetchExams = async () => {
      try {
        const response = await fetch(`${BackendAPI}/api/exam/examlist`, {
          method: 'GET',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        });
        const fetcheddata = await response.json();
        console.log('Fetched Exam Data:', fetcheddata); // 🔍 Debugging log
        // ✅ Adjust according to your API response structure

        if (response.ok) {
          setExams(fetcheddata.fetchexamdetails || []);
          console.log('after setting the value of exam in setexams', exams);
        } else {
          console.error('Error fetching exams:', data.message);
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    fetchExams();
  }, [navigate]);

  const startExam = async id => {
    const examID = id;
    const userID = user._id;
    const attemptNumber = 1;
    // alert(`examID is ${examID} and userID os ${userID}`);
    try {
      const response = await fetch(`${BackendAPI}/api/exam/userattempts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userID,
          examId: examID,
          attemptNumber: attemptNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('exam started successfully', data);
        navigate(`/userquedashobard/${data.attemptId}`);
        // navigate(`/userquedashobard/${data.examID}`);
      } else {
        console.log('error starting exam', data.message);
        alert(`error starting exam ${data.message}`);
      }
    } catch (error) {
      console.log('error submitting(attempting) the exam ', error);
    }
  };

  // const formattedDurations = duration => {
  //   if (!duration) return 'N/A';
  //   const { hours = 0, minutes = 0, seconds = 0 } = duration;
  //   return `${hours}h ${minutes}m ${seconds}s`;
  // };
  const formattedDurations = duration => {
    if (!duration || typeof duration !== 'object') return 'N/A';

    const { hours = 0, minutes = 0, seconds = 0 } = duration;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      <Header />
      <h2 className='cursor-default mainheading'>{
        `Welcome to Online Examination Portal `
        //`Welcome ${
        //user.username
        // user._id
        //login user id is defined as  "user._id"
        //}, Select Your Exam`
      }</h2>
      <div className='examhomemain'>
        <section className='examlistsection'>
          {exams.length > 0 ? (
            exams.map(exam => (
              <div key={exam._id} className='entity-design'>
                <h3 className='exam-head'> {exam.examname}</h3>
                <p className='exam-desc'>Description: {exam.description} </p>
                <p className='exam-desc'>
                  Duration: {formattedDurations(exam.duration)} mins
                </p>
                <button
                  className='exam-button'
                  onClick={() => startExam(exam._id)}
                >
                  Start Exam
                </button>
                {/*  */}
              </div>
            ))
          ) : (
            <p className='no-exam'>No exams available.</p>
          )}
        </section>
        <div className='rightsideexam'>
          <p className='examrightsideh '>Exam Guidelines</p>
          <ul className='ulist'>
            <li className='RSContent'>
              Once you start exam, You must finish it.
            </li>
            <li className='RSContent'>
              Time will keep running, you can't pause it.
            </li>
            <li className='RSContent'>
              Make sure you review your answer before submitting it.
            </li>
            <li className='RSContent'>
              Leaving the page might result in Automatic Submission after the
              exam predefined time period.{' '}
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};
