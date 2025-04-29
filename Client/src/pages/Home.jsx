import { Header } from './Header';
import { useNavigate } from 'react-router-dom';
import { Footer } from './footer';
import '../style/home.css';
export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <section className=' home-page'>
        <div className='container grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-2'>
          <div className='home-content'>
            <p className='first-desc'>
              One of the best online examination platform in the United Kingdom
            </p>
            <h1 className='heading'>Welcome to Online Examination Platform</h1>
            <p className='second-desc'>
              {' '}
              Our platform revolutionises the way exams are conducted, offering
              a seamless, secure, and efficient way to evaluate knowledge and
              skills online. Whether you&apos;re an educational institution, a
              training organisation, or an individual looking to create or
              participate in exams, we&apos;ve got you covered. Enjoy features
              such as real-time results, advanced proctoring, and customisable
              tests—all designed to provide a smooth and reliable examination
              experience.
            </p>
            <div className='connect-buttons'>
              <button
                type='button'
                className='home-redirect-contact'
                onClick={() => navigate('/contactus')}
              >
                Join Us
              </button>
              <button
                type='button'
                className='home-redirect-contact'
                onClick={() => navigate('/aboutus')}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className='home-image'>
            <img
              src='/images/logo.png'
              alt='LOGO'
              className=' homepage-image'
            />
          </div>
        </div>
      </section>
      <section className='ratings-section home-page'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 rating-main-container md:grid-cols-2 lg:grid-cols-4 '>
            <div className='rating-content'>
              <h2 className='rating-head'>50+</h2>
              <p className='rating-paragraph'>Offered Courses</p>
            </div>
            <div className='rating-content'>
              <h2 className='rating-head'>10,000+</h2>
              <p className='rating-paragraph'> Reviews</p>
            </div>
            <div className='rating-content'>
              <h2 className='rating-head'>40+</h2>
              <p className='rating-paragraph'>Developers</p>
            </div>
            <div className='rating-content'>
              <h2 className='rating-head'>24/7</h2>
              <p className='rating-paragraph'>Services</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
