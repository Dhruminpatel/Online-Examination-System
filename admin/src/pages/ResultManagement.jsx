import React from 'react';
import { Search, Download } from 'lucide-react';

export const ResultManagement = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Result Management</h1>
        <button className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
          <Download className='w-5 h-5' />
          Export Results
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
              <input
                type='text'
                placeholder='Search results...'
                className='w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500'
              />
            </div>
            <select className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'>
              <option value=''>All Exams</option>
              <option value='math'>Basic Mathematics</option>
              <option value='physics'>Physics Fundamentals</option>
            </select>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-4 py-3 text-left'>Student Name</th>
                <th className='px-4 py-3 text-left'>Exam Name</th>
                <th className='px-4 py-3 text-left'>Score</th>
                <th className='px-4 py-3 text-left'>Percentage</th>
                <th className='px-4 py-3 text-left'>Status</th>
                <th className='px-4 py-3 text-left'>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='px-4 py-3'>John Doe</td>
                <td className='px-4 py-3'>Basic Mathematics</td>
                <td className='px-4 py-3'>45/50</td>
                <td className='px-4 py-3'>90%</td>
                <td className='px-4 py-3'>
                  <span className='px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full'>
                    Passed
                  </span>
                </td>
                <td className='px-4 py-3'>2024-03-15</td>
              </tr>
              <tr className='border-b'>
                <td className='px-4 py-3'>Jane Smith</td>
                <td className='px-4 py-3'>Physics Fundamentals</td>
                <td className='px-4 py-3'>38/50</td>
                <td className='px-4 py-3'>76%</td>
                <td className='px-4 py-3'>
                  <span className='px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full'>
                    Passed
                  </span>
                </td>
                <td className='px-4 py-3'>2024-03-14</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='p-4 border-t'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-500'>Showing 1 to 10 of 50 entries</p>
            <div className='flex items-center gap-2'>
              <button className='px-3 py-1 border rounded hover:bg-gray-50'>
                Previous
              </button>
              <button className='px-3 py-1 text-white bg-blue-600 rounded'>
                1
              </button>
              <button className='px-3 py-1 border rounded hover:bg-gray-50'>
                2
              </button>
              <button className='px-3 py-1 border rounded hover:bg-gray-50'>
                3
              </button>
              <button className='px-3 py-1 border rounded hover:bg-gray-50'>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold'>Pass/Fail Statistics</h2>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span>Total Passed</span>
              <span className='font-semibold text-green-600'>85%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-green-600 h-2.5 rounded-full'
                style={{ width: '85%' }}
              ></div>
            </div>
            <div className='flex items-center justify-between'>
              <span>Total Failed</span>
              <span className='font-semibold text-red-600'>15%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-red-600 h-2.5 rounded-full'
                style={{ width: '15%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold'>
            Average Scores by Subject
          </h2>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span>Mathematics</span>
              <span className='font-semibold text-blue-600'>78%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{ width: '78%' }}
              ></div>
            </div>
            <div className='flex items-center justify-between'>
              <span>Physics</span>
              <span className='font-semibold text-purple-600'>82%</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-purple-600 h-2.5 rounded-full'
                style={{ width: '82%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
