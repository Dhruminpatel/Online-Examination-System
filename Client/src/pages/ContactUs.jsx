import { Header } from './Header';
import { Footer } from './footer';
import '../style/contactus.css';
import { useAuth } from '../store/auth';
import { useState, useEffect } from 'react';

const defaultContactForm = { username: '', email: '', message: '' };
export const ContactUs = () => {
  const [contact, setContact] = useState(defaultContactForm);

  const { user } = useAuth();
  const [userData, setUserData] = useState(true);

  // ✅ Fix: Prevent infinite re-renders by using useEffect
  useEffect(() => {
    if (user && userData) {
      setContact({ username: user.username, email: user.email, message: '' });
      setUserData(false);
    }
  }, [user, userData]); // Runs only when user or userData changes

  const handleInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handlesubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://online-examination-system-9l8r.onrender.com/api/form/contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact),
        }
      );
      if (response.ok) {
        setContact(defaultContactForm);
        const data = await response.json();
        alert('message sent successfully');
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(contact);
  };

  return (
    <>
      <Header />
      <section className='contact-container'>
        <div className='contact-wrapper'>
          <div className='contact-image'>
            <img src='/images/Contactus.jpg' alt='Contact Us' />
          </div>

          <div className='contact-form'>
            <h2 className='contact-title'>Get in Touch</h2>
            <p className='contact-subtitle'>We'd love to hear from you!</p>

            <form onSubmit={handlesubmit} className='contact-form-group'>
              <input
                type='text'
                placeholder='Your Name'
                className='contact-input'
                name='username'
                value={contact.username}
                onChange={handleInput}
              />
              <input
                type='email'
                placeholder='Your Email'
                className='contact-input'
                name='email'
                value={contact.email}
                onChange={handleInput}
              />
              <textarea
                placeholder='Your Message'
                className='contact-textarea'
                name='message'
                value={contact.message}
                onChange={handleInput}
              ></textarea>
              <button type='submit' className='contact-button'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
