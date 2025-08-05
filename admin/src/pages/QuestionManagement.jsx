import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export const QuestionManagement = () => {
  const [fetchquestions, setfetchquestions] = useState([]);
  const [deletequestionId, setdeletequestionId] = useState(null);
  const [updatequestionID, setupdatequestionID] = useState(null);
  const [showdeletemodel, setshowdeletemodel] = useState(false);
  const [showupdatemodel, setshowupdatemodel] = useState(false);
  const [showcreatemodel, setshowcreatemodel] = useState(false);
  const [examdata, setexamdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setselectedExam] = useState('All');
  const BackendAPI = import.meta.env.VITE_API_BACKENDURL;
  const qfieldstructure = {
    examId: '',
    question: '',
    options: { A: '', B: '', C: '', D: '' },
    correctOption: '',
    marks: '',
  };
  const [updatequestion, setupdatequestion] = useState(qfieldstructure);
  const examsperpage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  //fetching questionlists
  useEffect(() => {
    const fetchquestiondetails = async () => {
      try {
        const fetchque = await fetch(`${BackendAPI}/api/exam/questionlist`);
        if (!fetchque.ok) {
          throw new Error('failed to fetch questions data', Error);
        }

        const questionsdata = await fetchque.json();

        setfetchquestions(questionsdata.questiondetails || []);
        // console.log('fetched questions in admin side are ', fetchquestions);
      } catch (error) {
        console.log('error fetching question', error);
      }
    };

    fetchquestiondetails();
  }, []);

  // memeorization;
  // ✅ 1. Filter questions with exam name (and optional search query)
  const filteredquestions = useMemo(() => {
    const examIdToName = examdata.reduce((acc, exam) => {
      acc[exam._id] = exam.examname;
      return acc;
    }, {});

    return fetchquestions
      .filter(question => {
        const examName = examIdToName[question.examId] || 'Unknown Exam';

        const matchesSearch =
          question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.examId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDropdown =
          selectedExam === 'All' || examName === selectedExam;

        return matchesSearch && matchesDropdown;
      })
      .map(question => ({
        ...question,
        examName: examIdToName[question.examId] || 'Unknown Exam',
      }));
  }, [fetchquestions, examdata, searchQuery, selectedExam]);

  //memorization of identical examname (USEMEMMO)
  const uniqueExamOptions = useMemo(() => {
    const seenNames = new Set();
    return examdata
      .filter(exam => {
        if (seenNames.has(exam.examname)) return false;
        seenNames.add(exam.examname);
        return true;
      })
      .map(exam => ({
        examId: exam._id,
        examName: exam.examname,
      }));
  }, [examdata]);

  //fetch exams
  useEffect(() => {
    const fetchexams = async () => {
      try {
        const fetchexams = await fetch(`${BackendAPI}/api/exam/examlist`);
        if (!fetchexams.ok) {
          throw new Error('failed to fetch Exam details ');
        }

        const examdetails = await fetchexams.json();

        setexamdata(examdetails.fetchexamdetails || []);
      } catch (error) {
        console.log('error fetching exam name', error);
      }
    };

    fetchexams();
  }, []);

  //delete questions
  const deletequestionClick = questionID => {
    setshowdeletemodel(true);
    setdeletequestionId(questionID);
  };
  //delete questionlist
  const deleteQeustion = async questionId => {
    try {
      const response = await fetch(
        `${BackendAPI}/api/exam/questionlist/${questionId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        console.log('Failed to delete Questions');
      } else {
        console.log('Successfully deleted Questions');
        alert('successfully deleted the exam');
      }
      // setfetchquestions(
      //   filteredquestions.filter(que => que._id !== questionId)
      // );
      setfetchquestions(prevQuestions =>
        prevQuestions.filter(que => que._id !== questionId)
      );
      setshowdeletemodel(false);
    } catch (error) {
      console.error('Error deleting Questions:', error);
    }
  };

  //update questions
  const updatequestionClick = question => {
    setshowupdatemodel(true);
    setupdatequestion(question); //to display the question in the model , not to change directly the original data
    setupdatequestionID(question);
  };

  const handlechange = e => {
    const { name, value } = e.target;

    // Handle nested options object (like options.A)
    if (name.startsWith('options.')) {
      const optionKey = name.split('.')[1];
      setupdatequestion(prev => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: value,
        },
      }));
    } else {
      setupdatequestion(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleupdatequestion = async e => {
    e.preventDefault();
    const questionId = updatequestionID._id; // assuming this holds the current question to update

    try {
      const response = await fetch(
        `${BackendAPI}/api/exam/questionlist/${questionId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatequestion),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        alert('Question updated successfully');
        console.log(updatedData);

        // Assuming you have a list called questionlist
        setfetchquestions(
          filteredquestions.filter(question => question._id !== questionId)
        );

        // Reset everything
        setupdatequestion(null);
        setshowupdatemodel(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to update question:', errorText);
        alert('Failed to update question.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Something went wrong during update.');
    }
  };

  //creating a new questions
  const sethanledecreate = () => {
    // alert('clicked on create question buttons');
    setshowcreatemodel(true);
  };

  const inputchage = e => {
    const { name, value } = e.target;

    // Handle nested options object (like options.A)
    if (name.startsWith('options.')) {
      const optionKey = name.split('.')[1];
      setupdatequestion(prev => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: value,
        },
      }));
    } else {
      setupdatequestion(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const Createexammodel = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${BackendAPI}/api/exam/questionlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatequestion),
      });
      if (response.ok) {
        setupdatequestion(qfieldstructure);
        const data = await response.json();
        alert('question created successfully');
        console.log(data);

        setshowcreatemodel(false);
        setupdatequestion(null);
      } else {
        // ✅ Optional: handle bad responses
        const errorText = await response.text();
        console.error('Failed to Create questions:', errorText);
        alert('Failed to Create questions.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //search query
  const searchandle = e => {
    setselectedExam(e.target.value);
  };

  const handlesearchinput = e => {
    setSearchQuery(e.target.value);
  };

  // panigation page
  //panigation for multiple page
  // const examsperpage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // getting the total number of pages
  const totalpage = Math.ceil(filteredquestions.length / examsperpage);

  const currentData = filteredquestions.slice(
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
      {/* add new questions */}
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Question Management</h1>

        <button
          onClick={() => sethanledecreate()}
          className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'
        >
          <Plus className='w-5 h-5' />
          Add New Questions
        </button>
      </div>
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
          {/* {search section } */}
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
              <input
                type='text'
                placeholder='Search questions...'
                className='w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500'
                onChange={handlesearchinput}
                value={searchQuery}
              />
            </div>
            <select
              name='examId'
              value={selectedExam}
              onChange={searchandle}
              className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            >
              <option value='All'>All Exams</option>
              {uniqueExamOptions?.length > 0 ? (
                uniqueExamOptions.map((exam, index) => (
                  <option key={index} value={exam.examName}>
                    {exam.examName}
                  </option>
                ))
              ) : (
                <option disabled> No exam availabe</option>
              )}
            </select>
          </div>
        </div>
        {/* table content and fetched data */}
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-4 py-3 text-left'>Question</th>
                <th className='px-4 py-3 text-left'>Exam</th>
                <th className='px-4 py-3 text-left'>Marks</th>
                <th className='px-4 py-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredquestions.length > 0 ? (
                currentData.map((questions, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-3'>{questions.question}</td>
                    <td className='px-4 py-3'>{questions.examName}</td>
                    <td className='px-4 py-3'>{questions.marks}</td>
                    <td className='px-3 py-4'>
                      <div className='flex items-center gap-2'>
                        <button
                          className='p-1 hover:text-blue-600'
                          onClick={() => updatequestionClick(questions)}
                        >
                          <Edit className='w-5 h-5' />
                        </button>
                        <button
                          className='p-1 hover:text-red-600'
                          onClick={() => deletequestionClick(questions)}
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
                    No Questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/*panigations for the page*/}
        {filteredquestions.length > 0 && pageNumbers.length > 0 && (
          <div className='p-4 border-t'>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500'>
                Showing {(currentPage - 1) * examsperpage + 1} to{' '}
                {Math.min(currentPage * examsperpage, filteredquestions.length)}{' '}
                of {filteredquestions.length} entries
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
      {/* Add Question Modal */}
      {showcreatemodel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-0 bg-white rounded-lg sm:p-6 '>
            <div className='max-h-[90vh] overflow-y-auto '>
              <h2 className='mb-4 text-xl font-semibold'>Add New Question</h2>
              <form className='space-y-4' onSubmit={Createexammodel}>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Select Exam
                  </label>
                  <select
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    name='examId'
                    value={updatequestion.examId}
                    onChange={inputchage}
                  >
                    {uniqueExamOptions?.length > 0 ? (
                      uniqueExamOptions.map((exam, index) => (
                        <option key={index} value={exam.examId}>
                          {exam.examName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No exams available at the moment</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Question
                  </label>
                  <textarea
                    name='question'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    rows={3}
                    placeholder='Enter question'
                    value={updatequestion.question}
                    onChange={inputchage}
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Options
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    <input
                      type='text'
                      name='options.A'
                      placeholder='Option A'
                      className='p-2 border rounded-md shadow-sm'
                      value={updatequestion.options.A}
                      onChange={inputchage}
                    />
                    <input
                      type='text'
                      placeholder='Option B'
                      name='options.B'
                      className='p-2 border rounded-md shadow-sm'
                      value={updatequestion.options.B}
                      onChange={inputchage}
                    />
                    <input
                      type='text'
                      placeholder='Option C'
                      name='options.C'
                      className='p-2 border rounded-md shadow-sm'
                      value={updatequestion.options.C}
                      onChange={inputchage}
                    />
                    <input
                      type='text'
                      placeholder='Option D'
                      name='options.D'
                      className='p-2 border rounded-md shadow-sm'
                      value={updatequestion.options.D}
                      onChange={inputchage}
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Correct Option
                  </label>
                  <select
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    onChange={inputchage}
                    value={updatequestion.correctOption}
                    name='correctOption'
                  >
                    {/* <option value=''> {updatequestion.correctOption}</option> */}
                    <option value='A'>{updatequestion.options.A}</option>
                    <option value='B'>{updatequestion.options.B}</option>
                    <option value='C'>{updatequestion.options.C}</option>
                    <option value='D'>{updatequestion.options.D}</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Marks
                  </label>
                  <input
                    name='marks'
                    type='number'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='Enter marks'
                    value={updatequestion.marks}
                    onChange={inputchage}
                  />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setshowcreatemodel(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* delete questions */}
      {showdeletemodel && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-6 bg-white rounded-lg'>
            {/* <h2 className='mb-4 text-xl font-semibold'>Delete Exam</h2> */}
            <h2 className='text-2xl font-bold text-center text-red-600'>
              Are you sure you want to delete the Questions?
            </h2>
            {deletequestionId && (
              <div className='mt-4 text-center '>
                <p className=''>
                  <strong>Exam Name:</strong>{' '}
                  {examdata.find(exam => exam._id === deletequestionId.examId)
                    ?.examname || 'Unknown Exam'}
                  {/* {examdata.find(exam => exam._id === deletequestionId.examId)
                    ?.examname || 'Unknown Exam'} */}
                </p>
                <p>
                  <strong>Question Name:</strong> {deletequestionId.question}
                </p>
              </div>
            )}
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-700 hover:font-bold'
                onClick={() => deleteQeustion(deletequestionId._id)}
              >
                Yes, Delete
              </button>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:font-bold'
                onClick={() => setshowdeletemodel(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      {/* update questions  */}
      {showupdatemodel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-0 bg-white rounded-lg sm:p-6 '>
            <div className='max-h-[90vh] overflow-y-auto '>
              <h2 className='mb-4 text-xl font-semibold'>Update Question</h2>
              <form className='space-y-4' onSubmit={handleupdatequestion}>
                <div className='space-y-2'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Question
                    </label>
                    <textarea
                      name='question'
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      rows={3}
                      placeholder='Enter question'
                      value={updatequestion.question}
                      onChange={handlechange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Select Exam
                    </label>
                    <select
                      className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                      name='examId'
                      value={updatequestion.examId}
                      onChange={handlechange}
                    >
                      {uniqueExamOptions?.length > 0 ? (
                        uniqueExamOptions.map((exam, index) => (
                          <option key={index} value={exam.examId}>
                            {exam.examName}
                          </option>
                        ))
                      ) : (
                        <option disabled>
                          No exams available at the moment
                        </option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Options
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    {['A', 'B', 'C', 'D'].map(letter => (
                      <input
                        key={letter}
                        type='text'
                        name={`options.${letter}`}
                        placeholder={`Option ${letter}`}
                        className='p-2 border rounded-md shadow-sm'
                        value={updatequestion.options[letter]}
                        onChange={handlechange}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Correct Option
                  </label>
                  <select
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    onChange={handlechange}
                    value={updatequestion.correctOption}
                    name='correctOption'
                  >
                    {/* <option value=''> {updatequestion.correctOption}</option> */}
                    <option value='A'>{updatequestion.options.A}</option>
                    <option value='B'>{updatequestion.options.B}</option>
                    <option value='C'>{updatequestion.options.C}</option>
                    <option value='D'>{updatequestion.options.D}</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Marks
                  </label>
                  <input
                    name='marks'
                    type='number'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='Enter marks'
                    value={updatequestion.marks}
                    onChange={handlechange}
                  />
                </div>
                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setshowupdatemodel(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Update Question
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
