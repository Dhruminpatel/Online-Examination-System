export const ProfileSidebar = () => {
  return (
    <>
      <div className='overflow-hidden bg-white border border-indigo-200 shadow-lg bg-opacity-10 backdrop-blur-sm rounded-xl border-opacity-20'>
        <div className='border-b border-indigo-200 border-opacity-20'>
          <div className='flex'>
            <button
              // onClick={() => setActiveTab('progress')}
              // className={`px-6 py-4 font-medium ${
              //   activeTab === 'progress'
              //     ? 'text-indigo-300 border-b-2 border-indigo-400'
              //     : 'text-blue-200 hover:text-white'
              // }`}
              className={`px-6 py-4 font-medium ${'text-black border-b-2 border-indigo-400'}`}
            >
              Progress Analytics
            </button>
            <button
              // onClick={() => setActiveTab('badges')}
              // className={`px-6 py-4 font-medium ${
              //   activeTab === 'badges'
              //     ? 'text-indigo-300 border-b-2 border-indigo-400'
              //     : 'text-blue-200 hover:text-white'
              // }`}

              className={`px-6 py-4 font-medium ${'text-black border-b-2 border-indigo-400'}`}
            >
              Badges Collection
            </button>
          </div>
        </div>

        <div className='p-6'>
          {/* {activeTab === 'progress' ? (
      <ProgressChart
        results={user.quizResults}
        quizTitles={quizTitles} */}
          {/* /> */}
          {/* ) : ( */}
          <div>
            <h2 className='mb-4 text-xl font-bold text-white'>Your Badges</h2>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
              {/* {badges.map(badge => (
            <BadgeItem
              key={badge.id}
              badge={badge}
              earned={user.badges.includes(badge.id)} */}
              {/* /> */}
              {/* ))} */}
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
      {console.log('this is profilesidebar')}
    </>
  );
};
