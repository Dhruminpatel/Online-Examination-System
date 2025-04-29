import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Service } from './pages/Service';
import { Login } from './pages/login';
import { Register } from './pages/Register';
import { Error } from './pages/Error';
import { Logout } from './pages/Logout';
import { Userque } from './pages/Userexamque';
import { UserexamHome } from './pages/Userexamhome';
import { UserProfileDashboard } from './pages/userprofile';
import { Testing } from './pages/testing';
// import { Header } from "./pages/Header";
import { AuthProvider } from './store/auth';
const App = () => {
  return (
    <>
      {/* <h1>hello world</h1> */}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/testing' element={<Testing />} />
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/contactus' element={<ContactUs />} />
            {/* <Route path='/service' element={<Service />} /> */}
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/userexamhome' element={<UserexamHome />} />
            <Route path='/userquedashobard/:attemptId' element={<Userque />} />
            <Route
              path='/userProfileDashboard'
              element={<UserProfileDashboard />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};
export default App;
// export default function App() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-blue-100">
//       <h1 className="text-4xl font-bold text-blue-500">Tailwind is working!</h1>
//     </div>
//   );
// }
