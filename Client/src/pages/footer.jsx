// import { useNavigate } from "react-router-dom";
import '../style/footer.css';

export const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div className=''>
          {/* <p className="web-rights">© 2025 Online Examination. All rights reserved.</p> */}
          {/* <div className="grid grid-flow-row-dense grid-cols-1 footer-content md:grid-cols-4"> */}
          <div className='grid grid-cols-1 gap-4 mx-auto md:grid-cols-4 list-text'>
            <div>
              <h3 className='footer-head'>Polices</h3>
              <ul>
                <li className='footer-subcontent'>
                  <a href='#'>Terms and Conditions</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>Privay Policy</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>User Agreement</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='footer-head'>Support</h3>
              <ul>
                <li className='footer-subcontent'>
                  <a href='#'>FAQ</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>Help Center</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>Guidelines</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='footer-head'>Contact Information</h3>
              <ul>
                <li className='footer-subcontent'>
                  <a href='#'>support@gmail.com</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>+44 1111 111111</a>
                </li>
                <li className='footer-subcontent'>
                  <a href='#'>Office Address:London,UK</a>
                </li>
              </ul>
            </div>
            <div>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1781.6706057950835!2d-0.3057775247264322!3d51.5068886107424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760df3035c5dfd%3A0x422f2334ccf21438!2sUniversity%20of%20West%20London!5e1!3m2!1sen!2suk!4v1740938394409!5m2!1sen!2suk'
                allowFullScreen=''
                loading='lazy'
                className='w-full h-40 max-h-screen rounded-lg shadow-md sm:h-52 md:h-64 lg:h-86 '
              ></iframe>
            </div>
          </div>
          {/* </div> */}
          <p className='web-rights'>
            © 2025 Online Examination. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};
