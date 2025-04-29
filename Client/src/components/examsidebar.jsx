export const ExamSidebar = ({ questions, activeQue, setActiveQue }) => {
  return (
    <div className='sidebarsec'>
      <h2 className='sidebarhead '>List of Questions</h2>
      <div className='sidebarque'>
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveQue(index)}
            className={`p-2 border rounded-full  ${
              activeQue === index
                ? 'bg-green-500 text-white font-semibold'
                : 'bg-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
