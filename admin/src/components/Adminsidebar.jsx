import React from 'react';
import '../styles/adminsidebar.css';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  Award,
  Bell,
  LogOut,
  Contact,
} from 'lucide-react';

export const Adminsidebar = () => (
  <div className='flex'>
    {/* Sidebar */}
    <div className='fixed flex flex-col justify-between w-64 h-screen p-4 text-white bg-gray-900'>
      {/* Sidebar Top (Logo & Links) */}
      <div>
        <div className='flex items-center gap-2 mb-8 hover:text-blue-600'>
          <BookOpen className='w-8 h-8 text-blue-400' />
          <span className='text-xl font-bold'>Admin Panel</span>
        </div>

        <nav className='space-y-2'>
          <Link
            to='/admin'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <LayoutDashboard className='w-5 h-5' />
            Dashboard
          </Link>

          <Link
            to='/admin/exams'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <BookOpen className='w-5 h-5' />
            Exams
          </Link>

          <Link
            to='/admin/questions'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <ClipboardList className='w-5 h-5' />
            Questions
          </Link>

          <Link
            to='/admin/users'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <Users className='w-5 h-5' />
            Users
          </Link>

          <Link
            to='/admin/results'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <Award className='w-5 h-5' />
            Results
          </Link>

          <Link
            to='/admin/contactus'
            className='flex items-center gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-blue-600'
          >
            <Contact className='w-5 h-5' />
            Contact Us
          </Link>
        </nav>
      </div>

      {/* Logout Button */}
      <div className='w-52'>
        <button className='flex items-center w-full gap-2 p-3 transition-colors rounded hover:bg-gray-800 hover:text-red-600'>
          <LogOut className='w-5 h-5' />
          Logout
        </button>
      </div>
    </div>

    {/* Top bar */}
    <div className='w-full p-4 ml-64 bg-white shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex item-center head'>
          <h1 className='text-xl font-semibold text-gray-800'>
            Admin Dashboard
          </h1>
        </div>
        <div className='flex items-center space-x-8 login-noti'>
          <div className='inline-block'>
            <h1 className='text-xl font-semibold text-gray-800'>
              <Bell className='w-5 h-5' />
            </h1>
          </div>
          <div className='inline-block'>
            <h1 className='text-xl font-semibold text-gray-800'>Admin User</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
);
