import { useState } from 'react';
import '../style/register.css';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './footer';
import { useAuth } from '../store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({});

  // handling the input values
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

    // Reset previous error messages
    setErrorMessages({});

    const errors = {};

    // Basic client-side validation
    if (!user.username.trim()) {
      errors.username = 'Username is required';
    } else if (user.username.length < 3) {
      errors.username = 'Username should be at least 3 characters';
    }

    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Invalid email address';
    }

    if (!user.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (user.phone.length < 10 || user.phone.length > 11) {
      errors.phone = 'Phone number should be between 10 and 11 digits';
    }

    if (!user.password.trim()) {
      errors.password = 'Password is required';
    } else if (user.password.length < 3 || user.password.length > 25) {
      errors.password = 'Password should be between 3 and 25 characters';
    }

    // If there are errors, don't submit the form
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    // alert(user)
    console.log(user);
    try {
      const response = await fetch(
        'https://online-examination-system-9l8r.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }
      );
      console.log('🔄 Raw Response:', response); // ✅ Log raw response

      // Check if the response is JSON
      // const result = await response.json();
      // console.log('✅ Server Response:', result);

      // if (!response.ok) {
      //   throw new Error(result.message || 'Registration failed');
      // }
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Server Response:', result);
        //store token in locak storage
        // StoretokenInLS means store token in local storage
        storetokenInLS(result.token);
        // localStorage.setItem('token', result.token);
        setUser({ username: '', email: '', phone: '', password: '' });
        navigate('/login');
      } else {
        toast.error('Email Already exists');
      }
      // console.log(response);
    } catch (error) {
      console.log('register', error);
    }
  };

  return (
    <>
      <Header />
      <section className=' section-registration'>
        <main>
          {/* <div className="container grid grid-cols-1 mx-auto sm:grid-cols-2"> */}
          {/* Registration Image */}
          <div className='container grid grid-flow-row-dense grid-cols-1 md:grid-cols-3'>
            <div className='col-span-2 registration-content-div'>
              {/* <img
                src="/images/register.jpg"
                alt="user is trying to register"
                className="image-styling"
              /> */}
              <p className='reg-desc reg-desc-1'>
                Sign up now to unlock exclusive perks and stay ahead!{' '}
              </p>
              <p className='reg-desc reg-desc-2'>
                Don’t miss out on tailored updates and opportunities!{' '}
              </p>
            </div>
            {/* Registration Form */}
            <div className='form-container'>
              <h1 className='form-heading'>Registration Form</h1>
              <ToastContainer
                position='top-left'
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={true}
                closeButton={true}
                draggable={true}
                className={'text-xs md:text-base p-0 m-0 mx-auto md:mt-20 '}
              />
              <form onSubmit={handlesubmit}>
                <div className='input-group'>
                  <label htmlFor='username' className='label-styling'>
                    <FontAwesomeIcon icon={Icon.faUser} className='regicons' />
                    Username:
                  </label>
                  <input
                    type='text'
                    name='username'
                    placeholder='Enter your name'
                    id='username'
                    required
                    autoComplete='off'
                    className='input-field'
                    value={user.username}
                    onChange={handleInput}
                  />
                  {errorMessages.username && (
                    <div className='wronginput'>{errorMessages.username}</div>
                  )}
                </div>

                <div className='input-group'>
                  <label htmlFor='email' className='label-styling'>
                    <FontAwesomeIcon
                      icon={Icon.faEnvelope}
                      className='regicons'
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
                    className='input-field'
                    value={user.email}
                    onChange={handleInput}
                  />
                  {errorMessages.email && (
                    <div className='wronginput'>{errorMessages.email}</div>
                  )}
                </div>

                <div className='input-group'>
                  <label htmlFor='phone' className='label-styling'>
                    <FontAwesomeIcon icon={Icon.faPhone} className='regicons' />
                    Phone:
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    placeholder='Enter your phone number'
                    id='phone'
                    required
                    autoComplete='off'
                    className='input-field '
                    value={user.phone}
                    onChange={handleInput}
                  />
                  {errorMessages.phone && (
                    <div className='wronginput'>{errorMessages.phone}</div>
                  )}
                </div>

                <div className='input-group'>
                  <label htmlFor='password' className='label-styling'>
                    <FontAwesomeIcon icon={Icon.faLock} className='regicons' />
                    Password:
                  </label>
                  <input
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    id='password'
                    required
                    autoComplete='off'
                    className='input-field'
                    value={user.password}
                    onChange={handleInput}
                  />
                  {errorMessages.password && (
                    <div className='wronginput'>{errorMessages.password}</div>
                  )}
                </div>
                <div>
                  <button type='submit' className='submit-button'>
                    Register
                  </button>
                </div>
              </form>
              <div className='m-3 label-styling'>
                <div>Already have a account ?</div>
                <div>
                  <button
                    type='button'
                    className=' login-button'
                    onClick={() => navigate('/login')}
                  >
                    Login
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
