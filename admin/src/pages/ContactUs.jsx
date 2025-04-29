import React from 'react';
import { Plus } from 'lucide-react';

export const ContactUs = () => {
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>ContactUS</h1>
        <button className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
          <Plus className='w-5 h-5' />
          Add New ContactUS
        </button>
      </div>
    </>
  );
};
