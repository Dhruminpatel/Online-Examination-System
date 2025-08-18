import '../style/userprofile.css';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { ArrowLeft, Award, BarChart3, Calendar } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './footer';
import { useAuth } from '../store/auth';
import { ProfileSidebar } from '../components/profilesidebar';
export const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const { user } = useAuth();
  const username = user.username;

  // Hardcoded quizzes
  const quizzes = [
    { id: '1', title: 'Math Quiz' },
    { id: '2', title: 'Science Quiz' },
  ];

  const quizTitles = {};
  quizzes.forEach(quiz => {
    quizTitles[quiz.id] = quiz.title;
  });

  // Calculate streak
  const streakText =
    user.streak > 0
      ? `${user.streak} day${user.streak > 1 ? 's' : ''} streak!`
      : 'No active streak';

  return (
    <>
      <Header />
      {console.log('username is ', username)}
      <div className='main-container'>
        <div className='profile-head'>
          <h1 className='profile-head-text'>Your Profile</h1>
        </div>

        <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-3'>
          <div className='md:col-span-1'>
            <div className='profile-box'>
              <div className='profile-topcolor'></div>
              <div className='px-6 pb-6'>
                <div className='profile-image'>
                  <div className='profile-img-inside'>
                    <span className='text-4xl'>👨‍🎓</span>
                  </div>
                </div>

                <h2 className='profile-username'>{username}</h2>

                {/* <div className='flex items-center justify-center mb-6 text-sm font-medium text-indigo-300'>
                  <Calendar size={16} className='mr-1' />
                  <span>{streakText}</span>
                </div> */}

                <div className='grid grid-cols-2 gap-4 mb-6 badges-quizes'>
                  <div className='quizes-badges'>
                    <div className='qb-content'>
                      <BarChart3 size={16} className='mr-2' />
                      <span className='text-sm font-medium'>Quizzes</span>
                    </div>
                    <p className='qb-results'>
                      {/* {user.quizResults.length} */}2
                    </p>
                  </div>

                  <div className='quizes-badges'>
                    <div className='qb-content'>
                      <Award size={16} className='mr-2' />
                      <span className='text-sm font-medium'>Badges</span>
                    </div>
                    <p className='qb-results'>{/* {user.badges.length} */}2</p>
                  </div>
                </div>

                <div className='profile-achievements-div'>
                  <h3 className='tag-recentachievements'>
                    Recent Achievements
                  </h3>
                  {/* {user.badges.length > 0 ? ( */}
                  <div className='space-y-2'>
                    {/* {user.badges.slice(0, 3).map(badgeId => { */}
                    {/* const badge = badges.find(b => b.id === badgeId);
                        if (!badge) return null; */}
                    return (
                    <div
                      // key={badge.id}
                      className='flex items-center p-2 bg-indigo-900 rounded-lg bg-opacity-30'
                    >
                      <span className='mr-2 text-2xl'>badge image</span>
                      <div>
                        <p className='font-medium text-white'>badge name</p>
                        <p className='text-xs text-blue-200'>
                          badge description
                        </p>
                      </div>
                    </div>
                    );
                    {/* })} */}
                    {/* {user.badges.length > 3 && ( */}
                    <button
                      // onClick={() => setActiveTab('badges')}
                      className='text-sm font-medium text-indigo-300 hover:underline'
                    >
                      View all badges
                    </button>
                    {/* )} */}
                  </div>
                  {/* ) : ( */}
                  <p className='text-sm text-blue-200'>
                    Complete quizzes to earn badges!
                  </p>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>

          <div className='md:col-span-2'>
            <ProfileSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
