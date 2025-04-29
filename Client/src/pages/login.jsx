import { useEffect, useState } from 'react';
import '../style/login.css';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './footer';
import { useAuth } from '../store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { storetokenInLS } = useAuth();
  const [errorMessages, setErrorMessages] = useState({});
  // handling the input values
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/userexamhome', { replace: true });
    }
  }, [navigate]);
  const handleInput = e => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  //submit handling the form
  const handlesubmit = async e => {
    e.preventDefault();

    setErrorMessages({});

    const errors = {};

    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Invalid email address';
    }

    if (!user.password.trim()) {
      errors.password = 'Password is required';
    } else if (user.password.length < 3 || user.password.length > 25) {
      errors.password = 'Password should be between 3 and 25 characters';
    }

    // If there are errors, don't submit the form
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      toast.error('Please fix the errors before submitting!');
      return;
    }
    // alert(user)
    try {
      const response = await fetch(
        'https://online-examination-system-9l8r.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Server Response:', result);
        //store token in locak storage
        storetokenInLS(result.token);

        navigate('/userexamhome');
      } else {
        // alert('Invalid Credentals');
        toast.error('Invalid credentials, please try again!');
        // console.log('Invalid Credentials');
      }
    } catch (error) {
      // toast.error('Something went wrong. Please try again later!');
    }
    console.log(user);
  };

  return (
    <>
      <Header />
      <section className=' section-login'>
        <main>
          {/* <div className="container grid grid-cols-1 mx-auto sm:grid-cols-2"> */}
          {/* Registration Image */}
          <div className='container grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 '>
            {/* <div className="col-span-2 login-image">
              <img
                src="/images/l.jpg"
                alt="user is trying to login"
                className="image-styling"
              />
            </div> */}

            {/* Registration Form */}
            <div className='col-start-2 form-container'>
              <h1 className='form-heading'>Login Form</h1>
              <ToastContainer
                position='top-right'
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={true}
                closeButton={true}
                draggable={true}
                className={'text-xs md:text-base p-0 m-0 mx-auto md:mt-20 '}
              />
              <form onSubmit={handlesubmit}>
                {/* <ToastContainer position='top-center' autoClose={3000} /> */}

                <div className='input-group'>
                  <label htmlFor='email' className='label-styling'>
                    <FontAwesomeIcon
                      icon={Icon.faEnvelope}
                      className='loginicons'
                    />
                    Email:
                  </label>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    id='email'
                    required
                    autoComplete='off'
                    className='logininput-field'
                    value={user.email}
                    onChange={handleInput}
                  />
                  {errorMessages.username && (
                    <div className='wronginput'>{errorMessages.email}</div>
                  )}
                </div>

                <div className='input-group'>
                  <label htmlFor='password' className='label-styling'>
                    <FontAwesomeIcon
                      icon={Icon.faLock}
                      className='loginicons'
                    />
                    Password:
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    id='password'
                    required
                    autoComplete='off'
                    className='logininput-field'
                    value={user.password}
                    onChange={handleInput}
                  />
                  {errorMessages.password && (
                    <div className='wronginput'>{errorMessages.password}</div>
                  )}
                </div>
                <div>
                  <button type='submit' className='loginsubmit-button'>
                    Login
                  </button>
                </div>
              </form>
              <div className='m-3 registerdiv'>
                <div>
                  <p>Don&apos;t have a account ?</p>
                </div>
                <div>
                  <button
                    type='button'
                    className=' register-button'
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
};
