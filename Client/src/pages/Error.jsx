import { Link } from 'react-router-dom';
import '../style/error.css';

export const Error = () => {
  return (
    <div className='error-container'>
      <h1 className='error-heading'>404</h1>
      <p className='error-message'>
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link to='/' className='error-button'>
        Go to Home
      </Link>
    </div>
  );
};
