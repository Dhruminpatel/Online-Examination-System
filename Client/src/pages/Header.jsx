import '../style/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Logout } from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export const Header = () => {
  const navigate = useNavigate();
  const { isloggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Aboutus', path: '/AboutUs' },
    { name: 'Contactus', path: '/Contactus' },
    { name: 'Exams', path: '/userexamhome' },
    ...(isloggedIn
      ? [{ Component: <ProfileCard /> }]
      : [{ name: 'Signup', path: '/Register' }]),
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='headcontainer'>
      <div className='header-content'>
        {/* Logo Section */}
        <div className='header-logo' onClick={() => navigate('/home')}>
          <img src='/images/logo.png' alt='Company Logo' className='logo' />
        </div>

        {/* Hamburger Icon */}
        <div className='hamburger' onClick={toggleMobileMenu}>
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
          {navItems.map((item, index) =>
            item.Component ? (
              <div key={index} className='profile-card-container'>
                {item.Component}
              </div>
            ) : (
              <Link key={item.name} to={item.path} className='nav-item'>
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

const ProfileCard = () => {
  const { user, LogoutUser } = useAuth();
  const navigate = useNavigate();
  const username = user?.username || 'Guest';
  const backgroundColor = '007bff';
  const fontColor = 'ffffff';

  return (
    <div className='relative cursor-pointer group'>
      {/* Profile Card */}
      <div className='profile-card'>
        <img
          src={`https://ui-avatars.com/api/?name=${username}&length=1&background=${backgroundColor}&color=${fontColor}`}
          alt={username}
          className='profile-img'
        />
        <div>
          <h2 className='profile-name'>{username}</h2>
          <p className='profile-email'>{user.email}</p>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className='dropdownmaindiv'>
        <ul className='unordered-list'>
          <li
            className='profile-list'
            onClick={() => navigate('/userProfileDashboard')}
          >
            <FontAwesomeIcon icon={Icon.faUser} className='iconclass' />
            <span>Profile</span>
          </li>
          <li className='profile-list' onClick={LogoutUser}>
            <FontAwesomeIcon
              icon={Icon.faRightFromBracket}
              className='iconclass'
            />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
