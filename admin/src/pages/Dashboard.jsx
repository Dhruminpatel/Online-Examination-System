import React from 'react';
import { Users, BookOpen, ClipboardList, Award } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
export const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersdetails, settotalUsersdetails] = useState([]);
  const [totalExams, settotalExams] = useState(0);
  const [totalExamsdetails, settotalExamsdetails] = useState([]);
  const [questionlists, setquestionlists] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Run all API calls in parallel for better performance
        const [usersRes, examsRes, questionsRes] = await Promise.all([
          fetch('http://localhost:5000/api/auth/afetcheduser'),
          fetch('http://localhost:5000/api/exam/examlist'),
          fetch('http://localhost:5000/api/exam/questionlist'),
        ]);

        if (!usersRes.ok || !examsRes.ok || !questionsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const usersData = await usersRes.json();
        const examsData = await examsRes.json();
        const questionsData = await questionsRes.json();

        setTotalUsers(usersData.totalUsers || 0);
        settotalUsersdetails(usersData.totalUsersdetails || []);
        settotalExamsdetails(examsData.fetchexamdetails || []);
        settotalExams(examsData.fetchedexams || 0);
        setquestionlists(questionsData.questions || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // UseMemo hook to memoize values
  const memoizedTotalUsers = useMemo(() => totalUsers, [totalUsers]);
  const memoizedTotalExams = useMemo(() => totalExams, [totalExams]);
  const memoizedQuestionlists = useMemo(() => questionlists, [questionlists]);
  const memoizedTotalUsersDetails = useMemo(
    () => totalUsersdetails,
    [totalUsersdetails]
  );
  const memoizedTotalexamDetails = useMemo(
    () => totalExamsdetails,
    [totalExamsdetails]
  );
  return (
    <>
      <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-4'>
        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <div className='flex items-center'>
            <Users className='w-10 h-10 text-blue-500' />
            <div className='ml-4'>
              <h3 className='text-sm text-gray-500'>Total Users</h3>
              <p className='text-2xl font-semibold'>{memoizedTotalUsers}</p>
            </div>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <div className='flex items-center'>
            <BookOpen className='w-10 h-10 text-green-500' />
            <div className='ml-4'>
              <h3 className='text-sm text-gray-500'>Total Exams</h3>
              <p className='text-2xl font-semibold'>{memoizedTotalExams}</p>
            </div>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <div className='flex items-center'>
            <ClipboardList className='w-10 h-10 text-purple-500' />
            <div className='ml-4'>
              <h3 className='text-sm text-gray-500'>Total Questions</h3>
              <p className='text-2xl font-semibold'>{memoizedQuestionlists}</p>
            </div>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <div className='flex items-center'>
            <Award className='w-10 h-10 text-yellow-500' />
            <div className='ml-4'>
              <h3 className='text-sm text-gray-500'>Exams Completed</h3>
              <p className='text-2xl font-semibold'>3,721</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold'>Recent Users</h2>
          <div className='overflow-x-auto h-60 '>
            <table className='min-w-full '>
              <thead>
                <tr className='sticky top-0 bg-white border-b '>
                  <th className='px-4 py-3 text-left'>Username</th>
                  <th className='px-4 py-3 text-left'>Email</th>
                  <th className='px-4 py-3 text-left'>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {memoizedTotalUsersDetails.map((user, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-3'>{user.username}</td>
                    <td className='px-4 py-3'>{user.email}</td>
                    <td className='px-4 py-3'>{user.phone}</td>
                  </tr>
                ))}
                {console.log(memoizedTotalexamDetails)}
              </tbody>
            </table>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold'>Recent Exams</h2>
          <div className='overflow-x-auto h-60 '>
            <table className='min-w-full'>
              <thead>
                <tr className='sticky top-0 bg-white border-b'>
                  <th className='px-4 py-3 text-left'>Exam Name</th>
                  <th className='px-4 py-3 text-left'>Subject</th>
                  <th className='px-4 py-3 text-left'>Status</th>
                </tr>
              </thead>
              <tbody>
                {memoizedTotalexamDetails.map((exams, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-3'>{exams.examname}</td>
                    <td className='px-4 py-3'>{exams.subject}</td>
                    <td className='px-4 py-3'>{exams.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
