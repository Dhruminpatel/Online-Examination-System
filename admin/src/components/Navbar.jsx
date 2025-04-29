import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User, LogIn, Home } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className='bg-white shadow-lg'>
      <div className='container px-4 mx-auto'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center space-x-2'>
            <BookOpen className='w-8 h-8 text-blue-600' />
            <span className='text-xl font-bold text-gray-800'>ExamPortal</span>
          </Link>

          <div className='flex items-center space-x-4'>
            <Link
              to='/'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-600'
            >
              <Home className='w-5 h-5' />
              <span>Home</span>
            </Link>

            <Link
              to='/exams'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-600'
            >
              <BookOpen className='w-5 h-5' />
              <span>Exams</span>
            </Link>

            <Link
              to='/login'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-600'
            >
              <LogIn className='w-5 h-5' />
              <span>Login</span>
            </Link>

            <Link
              to='/register'
              className='flex items-center space-x-1 text-gray-600 hover:text-blue-600'
            >
              <User className='w-5 h-5' />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
