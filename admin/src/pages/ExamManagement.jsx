import React, { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
const BackendAPI = import.meta.env.VITE_API_BACKENDURL;
export const ExamManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [examdetails, setexamdetails] = useState([]);
  const [deleteConfirmationModal, setdeleteConfirmationModal] = useState(false); //bydefault false
  const [examToDelete, setExamToDelete] = useState(null);
  const [updateexammodel, setupdateexammodel] = useState(false);
  const [ExamToupdate, setExamToupdate] = useState(null);
  const [createexammodel, setcreateexammodel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('All'); // const [userid, setuserID] = useState(null);
  const usercreateId = '67cc257c8e5446b1ff82097c';
  const updateexamfiled = {
    examname: '',
    subject: '',
    duration: { hours: '', minutes: '', seconds: '' },
    totalMarks: '',
    passingmarks: '',
    status: '',
    maxAttempts: '',
    createdBy: '',
  };
  const [changedexamdata, setchangedexamdata] = useState(updateexamfiled);
  const examsperpage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchexamdetails = async () => {
      try {
        const fetchexam = await fetch(`${BackendAPI}/api/exam/examlist`);
        if (!fetchexam.ok) {
          throw new Error('failed to fetch exam data');
        }

        const examdata = await fetchexam.json();

        setexamdetails(examdata.fetchexamdetails || []);
      } catch (error) {
        console.log('error fetching examdetails', error);
      }
    };

    fetchexamdetails();
  }, []);

  // const memorizeexamdetails = useMemo(() => examdetails, [examdetails]);
  //usememo function
  const filteredExams = useMemo(() => {
    return examdetails.filter(exam => {
      const matchesSearch =
        exam.examname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDropdown =
        selectedExam === 'All' || exam.examname === selectedExam;
      return matchesSearch && matchesDropdown;
    });
  }, [examdetails, searchQuery, selectedExam]);
  // deleteexam function
  const deleteExam = async examId => {
    try {
      const response = await fetch(
        `${BackendAPI}/api/exam/examlist/${examId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        console.log('Failed to delete exam');
      }
      setexamdetails(filteredExams.filter(exam => exam._id !== examId));
      setdeleteConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const handledeleteClick = exam => {
    setExamToDelete(exam);
    setdeleteConfirmationModal(true);
  };

  //upate exammcode
  const handleupdateClick = exam => {
    setExamToupdate(exam);
    setchangedexamdata(exam);
    setupdateexammodel(true);
  };

  const handlechange = async e => {
    const { name, value } = e.target;

    if (name.startsWith('duration.')) {
      const key = name.split('.')[1];
      setchangedexamdata(prev => ({
        ...prev,
        duration: {
          ...prev.duration,
          [key]: value,
        },
      }));
    } else
      setchangedexamdata({
        ...changedexamdata,
        [name]: value,
      });
  };

  const handleupdateexam = async e => {
    e.preventDefault();
    const examId = ExamToupdate._id;
    try {
      const response = await fetch(
        `${BackendAPI}/api/exam/examlist/${examId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changedexamdata),
        }
      );
      if (response.ok) {
        setchangedexamdata(updateexamfiled);
        const data = await response.json();
        alert('exam updated successfully');
        console.log(data);

        setexamdetails(memorizeexamdetails.filter(exam => exam._id !== examId));

        setExamToupdate(null);
        setchangedexamdata(null);
        setupdateexammodel(false);
      } else {
        // ✅ Optional: handle bad responses
        const errorText = await response.text();
        console.error('Failed to update exam:', errorText);
        alert('Failed to update exam.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //creating exam
  const handlecreateexam = () => {
    // const userId = localStorage.getItem("userId"); // or however you get it

    // const usercreateId = '67cc257c8e5446b1ff82097c';
    // setchangedexamdata(null);

    setchangedexamdata({
      ...updateexamfiled,
      createdBy: usercreateId,
    });
    setcreateexammodel(true);
  };

  const handleinputC = async e => {
    const { name, value } = e.target;

    if (name.startsWith('duration.')) {
      const key = name.split('.')[1];
      setchangedexamdata(prev => ({
        ...prev,
        duration: {
          ...prev.duration,
          [key]: value,
        },
      }));
    } else
      setchangedexamdata({
        ...changedexamdata,
        [name]: value,
      });
  };
  const handlecreatingexam = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${BackendAPI}/api/exam/examlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedexamdata),
      });
      if (response.ok) {
        setchangedexamdata(updateexamfiled);
        const data = await response.json();
        alert('exam created successfully');
        console.log(data);

        setcreateexammodel(false);
        setchangedexamdata(null);
      } else {
        // ✅ Optional: handle bad responses
        const errorText = await response.text();
        console.error('Failed to Create exam:', errorText);
        alert('Failed to Create exam.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //search query
  const handlesearchinput = e => {
    setSearchQuery(e.target.value);
  };

  const searchandle = e => {
    setSelectedExam(e.target.value);
  };

  //panigation for multiple page
  // const examsperpage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // getting the total number of pages
  const totalpage = Math.ceil(filteredExams.length / examsperpage);

  const currentData = filteredExams.slice(
    (currentPage - 1) * examsperpage,
    currentPage * examsperpage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalpage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // const pageNumbers = Array.from({ length: totalpage }, (_, i) => i + 1);

  const pageNumbers = [];

  if (totalpage === 1) {
    pageNumbers[1];
  } else if (currentPage === 1) {
    pageNumbers.push(1, 2, 3); // Show pages 1, 2, 3 when at the start
  } else if (currentPage === totalpage) {
    pageNumbers.push(totalpage - 2, totalpage - 1, totalpage); // Show last 3 pages
  } else {
    pageNumbers.push(currentPage - 1, currentPage, currentPage + 1); // Show current page and 1 before/after
  }

  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Exam Management</h1>
        <button
          onClick={() => handlecreateexam()}
          className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'
        >
          <Plus className='w-5 h-5' />
          Add New Exam
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
              <input
                type='text'
                placeholder='Search exams || Search by Subject...'
                className='w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500'
                onChange={handlesearchinput}
                value={searchQuery}
              />
            </div>
            <div>
              <select
                className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
                name='Searchexamlist'
                value={selectedExam}
                onChange={searchandle}
              >
                <option value='All'>All Exams</option>
                {examdetails.map((exam, idx) => (
                  <option key={idx} value={exam.examname}>
                    {exam.examname}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* //displaying total exam exists */}
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='sticky top-0 bg-gray-50'>
                <th className='px-4 py-3 text-left'>Exam Name</th>
                <th className='px-4 py-3 text-left'>Subject</th>
                <th className='px-4 py-3 text-left'>Duration</th>
                <th className='px-4 py-3 text-left'>Total Marks</th>
                <th className='px-4 py-3 text-left'>Status</th>
                <th className='px-4 py-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.length > 0 ? (
                currentData.map((exams, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-3'>{exams.examname}</td>
                    <td className='px-4 py-3'>{exams.subject}</td>
                    <td className='px-4 py-3'>{`${exams.duration.hours}h ${exams.duration.minutes}m ${exams.duration.seconds}s`}</td>
                    <td className='px-4 py-3'>{exams.totalMarks}</td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-2 py-1 text-sm font-medium rounded-full ${
                          exams.status.toLowerCase() === 'active'
                            ? 'text-green-800 bg-green-100'
                            : 'text-red-800 bg-red-100'
                        }`}
                      >
                        {exams.status}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-2'>
                        <button
                          className='p-1 hover:text-blue-600'
                          onClick={() => handleupdateClick(exams)}
                        >
                          <Edit className='w-5 h-5' />
                        </button>
                        <button
                          className='p-1 hover:text-red-600'
                          onClick={() => handledeleteClick(exams)}
                        >
                          <Trash2 className='w-5 h-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan='6'
                    className='p-4 font-bold text-center text-red-500 '
                  >
                    No exams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* //show panigations */}
        {filteredExams.length > 0 && pageNumbers.length > 0 && (
          <div className='p-4 border-t'>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500'>
                Showing {(currentPage - 1) * examsperpage + 1} to{' '}
                {Math.min(currentPage * examsperpage, filteredExams.length)} of{' '}
                {filteredExams.length} entries
              </p>
              <div className='flex items-center gap-2'>
                <button
                  className='px-3 py-1 border rounded hover:bg-gray-50'
                  onClick={handlePrevious}
                  hidden={currentPage === 1} // Disable if on the first page
                >
                  Previous
                </button>

                {pageNumbers.map(pageNum => (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className='px-3 py-1 border rounded hover:bg-gray-50'
                  onClick={handleNext}
                  hidden={currentPage === totalpage} // Disable if on the last page
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Exam Modal */}
      {createexammodel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-0 bg-white rounded-lg sm:p-6 '>
            <div className='max-h-[90vh] overflow-y-auto '>
              <h2 className='mb-4 text-xl font-semibold'>Create Exam</h2>
              <form className='space-y-4' onSubmit={handlecreatingexam}>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Exam Name
                  </label>
                  <input
                    type='text'
                    name='examname'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='Enter exam name'
                    value={changedexamdata.examname}
                    onChange={handleinputC}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Subject
                  </label>
                  <input
                    type='text'
                    name='subject'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                    placeholder='Enter Subject Name'
                    value={changedexamdata.subject}
                    onChange={handleinputC}
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Duration
                    </label>
                    <div className='grid grid-cols-1 gap-4 timedurations lg:grid-cols-3'>
                      <div className='hours'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Hours
                        </label>
                        <input
                          type='number'
                          name='duration.hours'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder='00'
                          value={changedexamdata.duration.hours}
                          onChange={handleinputC}
                        />
                      </div>
                      <div className=' minutes'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Minutes
                        </label>
                        <input
                          type='number'
                          name='duration.minutes'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder='00'
                          value={changedexamdata.duration.minutes}
                          onChange={handleinputC}
                        />
                      </div>
                      <div className='Seconds'>
                        <label className='block text-sm font-medium text-gray-700'>
                          seconds
                        </label>
                        <input
                          type='number'
                          name='duration.seconds'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder=' 00'
                          value={changedexamdata.duration.seconds}
                          onChange={handleinputC}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Total Marks
                    </label>
                    <input
                      type='number'
                      name='totalMarks'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter duration'
                      value={changedexamdata.totalMarks}
                      onChange={handleinputC}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Passing Marks
                    </label>
                    <input
                      type='number'
                      name='passingmarks'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter total marks'
                      value={changedexamdata.passingmarks}
                      onChange={handleinputC}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Status
                    </label>
                    <select
                      name='status'
                      value={changedexamdata.status}
                      onChange={handleinputC}
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    >
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Max Attempts
                    </label>
                    <input
                      type='number'
                      name='maxAttempts'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter total marks'
                      value={changedexamdata.maxAttempts}
                      onChange={handleinputC}
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    type='textarea'
                    name='description'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    rows={3}
                    placeholder='Enter exam description'
                    value={changedexamdata.description}
                    onChange={handleinputC}
                  />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setcreateexammodel(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Create Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* delete confirmation model */}
      {deleteConfirmationModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-6 bg-white rounded-lg'>
            {/* <h2 className='mb-4 text-xl font-semibold'>Delete Exam</h2> */}
            <h2 className='text-2xl font-bold text-center text-red-600'>
              Are you sure you want to delete the exam?
            </h2>
            {examToDelete && (
              <div className='mt-4 text-center '>
                <p className=''>
                  <strong>Exam Name:</strong> {examToDelete.examname}
                </p>
                <p>
                  <strong>Subject Name:</strong> {examToDelete.subject}
                </p>
              </div>
            )}
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-700 hover:font-bold'
                onClick={() => deleteExam(examToDelete._id)}
              >
                Yes, Delete
              </button>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:font-bold'
                onClick={() => setdeleteConfirmationModal(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* udpateexam model  */}
      {updateexammodel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-0 bg-white rounded-lg sm:p-6 '>
            <div className='max-h-[90vh] overflow-y-auto '>
              <h2 className='mb-4 text-xl font-semibold'>Update Exam</h2>
              <form className='space-y-4' onSubmit={handleupdateexam}>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Exam Name
                  </label>
                  <input
                    type='text'
                    name='examname'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='Enter exam name'
                    value={changedexamdata.examname}
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Subject
                  </label>
                  <input
                    type='text'
                    name='subject'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                    placeholder='Enter Minutes'
                    value={changedexamdata.subject}
                    onChange={handlechange}
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Duration
                    </label>
                    <div className='grid grid-cols-1 gap-4 timedurations lg:grid-cols-3'>
                      <div className='hours'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Hours
                        </label>
                        <input
                          type='number'
                          name='duration.hours'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder=' 00'
                          value={changedexamdata.duration.hours}
                          onChange={handlechange}
                        />
                      </div>
                      <div className=' minutes'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Minutes
                        </label>
                        <input
                          type='number'
                          name='duration.minutes'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder='00'
                          value={changedexamdata.duration.minutes}
                          onChange={handlechange}
                        />
                      </div>
                      <div className='Seconds'>
                        <label className='block text-sm font-medium text-gray-700'>
                          seconds
                        </label>
                        <input
                          type='number'
                          name='duration.seconds'
                          className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                          placeholder='00'
                          value={changedexamdata.duration.seconds}
                          onChange={handlechange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Total Marks
                    </label>
                    <input
                      type='number'
                      name='totalMarks'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter duration'
                      value={changedexamdata.totalMarks}
                      onChange={handlechange}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Passing Marks
                    </label>
                    <input
                      type='number'
                      name='passingmarks'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter total marks'
                      value={changedexamdata.passingmarks}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Status
                    </label>
                    <select
                      name='status'
                      value={changedexamdata.status}
                      onChange={handlechange}
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    >
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Max Attempts
                    </label>
                    <input
                      type='number'
                      name='maxAttempts'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      placeholder='Enter total marks'
                      value={changedexamdata.maxAttempts}
                      onChange={handlechange}
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    type='textarea'
                    name='description'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    rows={3}
                    placeholder='Enter exam description'
                    value={changedexamdata.description}
                    onChange={handlechange}
                  />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setupdateexammodel(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Update Exam
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
