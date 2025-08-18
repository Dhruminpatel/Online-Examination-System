import { Header } from './Header';
import { Footer } from './footer';
import '../style/aboutus.css';
export const AboutUs = () => {
  return (
    <>
      <Header />
      <section className='aboutus-bg'>
        <div className='bg-red-400 aboutus-img'>
          <img src='/images/logo.png' alt='company-logo' className='mx-auto ' />
        </div>
        <div className='container px-6 mx-auto py-14'>
          <div className='grid items-center grid-cols-1 p-5 mx-auto md:grid-cols-2 lg:grid-cols-2'>
            <div className='flex justify-center order-2 md:order-1 lg:order-1'>
              <img
                src='/images/mission.jpg'
                alt='profile image'
                className='object-cover rounded-full shadow-lg '
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <div className='order-1 md:order-2 lg:order-2'>
              <h2 className='mb-4 text-3xl font-bold '>Our Mission</h2>
              <p className='mb-6 leading-relaxed text-gray-600'>
                Our mission is to deliver modern, scalable solutions that
                empower businesses to grow. We combine technology and creativity
                to provide seamless user experiences.
              </p>
            </div>
          </div>
          <div className='grid items-center grid-cols-1 p-5 mx-auto mt-5 md:grid-cols-2 lg:grid-cols-2'>
            <div className='order-1 md:order-1 lg:order-1'>
              <h2 className='mb-4 text-3xl font-bold '>Our Vision</h2>
              <p className='mb-6 leading-relaxed text-gray-600 '>
                We envision a future where technology ensures fair and
                accessible education for all. Our system is designed to adapt
                with changing educational needs, ensuring reliable assessments
                anytime, anywhere.
              </p>
            </div>
            <div className='flex justify-center order-2 md:order-2 lg:order-2'>
              <img
                src='/images/vision.jpg'
                alt='profile image'
                className='object-cover rounded-full shadow-lg '
                style={{ width: '200px', height: '200px' }}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
