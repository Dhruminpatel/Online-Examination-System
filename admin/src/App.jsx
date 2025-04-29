import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Adminsidebar } from './components/Adminsidebar';
import { AdminDashboard } from './pages/Dashboard';
import { ExamManagement } from './pages/ExamManagement';
import { QuestionManagement } from './pages/QuestionManagement';
import { UserManagement } from './pages/UserManagement';
import { ResultManagement } from './pages/ResultManagement';
import { ContactUs } from './pages/ContactUs';
// import Login from './pages/Login';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='min-h-screen bg-gray-100'>
          <Adminsidebar />
          <div className='p-8 ml-64'>
            <section className='container mx-auto md:px-4 md:py-8'>
              <Routes>
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/exams' element={<ExamManagement />} />
                <Route
                  path='/admin/questions'
                  element={<QuestionManagement />}
                />
                <Route path='/admin/results' element={<ResultManagement />} />
                <Route path='/admin/users' element={<UserManagement />} />
                <Route path='/admin/contactus' element={<ContactUs />} />
              </Routes>
            </section>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
