import React, { useEffect, useMemo, useState } from 'react';
import { Search, Edit, Trash2, UserPlus } from 'lucide-react';

export const UserManagement = () => {
  const [userdetails, setuserdetails] = useState([]);
  const [deleteConfirmationModal, setdeleteConfirmationModal] = useState(false);
  const [usertodelete, setusertodelete] = useState(null);
  const [updateusermodel, setupdateusermodel] = useState(false);
  const [usertoupdate, setusertoupdate] = useState(null);
  const userfields = { username: '', email: '', phone: '', isAdmin: '' };
  const [UC_userdetails, setUC_userdetails] = useState(userfields);
  const [isreadonly, setIsreadonly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setselectedRole] = useState('All');
  const usersperpage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const BackendAPI = import.meta.env.VITE_API_BACKENDURL;
  //fetchign user details
  useEffect(() => {
    const fetchuserdetails = async () => {
      try {
        const fetchuser = await fetch(`${BackendAPI}/api/auth/afetcheduser`);
        if (!fetchuser.ok) {
          throw new Error('failed to fetch USER data');
        }

        const userdata = await fetchuser.json();

        setuserdetails(userdata.totalUsersdetails || []);
      } catch (error) {
        console.log('error fetching user details', error);
      }
    };

    fetchuserdetails();
  }, []);

  //memorization of usememo
  const filteredUsers = useMemo(() => {
    return userdetails.filter(user => {
      const matchesSearch =
        // user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDropdown =
        selectedRole === 'All' ||
        (selectedRole === 'Admin' && user.isAdmin) ||
        (selectedRole === 'User' && !user.isAdmin);

      return matchesSearch && matchesDropdown;
    });
  }, [userdetails, searchQuery, selectedRole]);

  //unique Roles
  const uniqueroles = useMemo(() => {
    const seenRoles = new Set();
    return userdetails
      .map(user => (user.isAdmin ? 'Admin' : 'User')) // derive role from isAdmin
      .filter(role => {
        if (seenRoles.has(role)) return false;
        seenRoles.add(role);
        return true;
      });

    // return userdetails
    //   .filter(user => {
    //     if (seenNames.has(user.isAdmin)) return false;
    //     seenNames.add(user.isAdmin);
    //     return true;
    //   })
    //   .map(user => ({
    //     userId: user._id,
    //     isAdmin: user.isAdmin,
    //   }));
  }, [userdetails]);
  //detetion of the user
  const handledeleteClick = deluser => {
    setdeleteConfirmationModal(true);
    setusertodelete(deluser);
  };

  //deteting user from database using fetch
  const deleteUser = async userId => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/deleteuser/${userId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        console.log('Failed to delete USER');
      }
      setuserdetails(filteruser.filter(user => user._id !== userId));
      console.log('deletion Successful');
      setdeleteConfirmationModal(false);
    } catch (error) {
      console.error('Error deleting User:', error);
    }
  };

  //update the user user details
  const handleupdateClick = updateuser => {
    setupdateusermodel(true);
    setUC_userdetails(updateuser);
    setusertoupdate(updateuser);
  };

  const handleupdateC = async e => {
    const { name, value } = e.target;

    // If the field is 'isAdmin', convert the value to a boolean
    if (name === 'isAdmin') {
      setUC_userdetails(prev => ({
        ...prev,
        isAdmin: value === 'true', // Convert string 'true'/'false' to boolean true/false
      }));
    } else {
      // Update other fields normally
      setUC_userdetails(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateduserdetails = async e => {
    try {
      const UuserId = usertoupdate._id;
      const response = await fetch(
        `http://localhost:5000/api/auth/aupdateuser/${UuserId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(UC_userdetails),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        alert('USER updated successfully');
        console.log(updatedData);

        // Assuming you have a list called questionlist
        setuserdetails(filteruser.filter(user => user._id !== UuserId));

        // Reset everything
        setUC_userdetails(null);
        setupdateusermodel(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to update USER Details:', errorText);
        alert('Failed to update USER Details.');
      }
    } catch (error) {
      console.error('Update error for the user:', error);
      alert('Something went wrong during update.');
    }
  };

  //search query
  const searchandle = e => {
    setselectedRole(e.target.value);
  };

  const handlesearchinput = e => {
    setSearchQuery(e.target.value);
  };

  //panigation
  const totalpage = Math.ceil(filteredUsers.length / usersperpage);

  const currentData = filteredUsers.slice(
    (currentPage - 1) * usersperpage,
    currentPage * usersperpage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalpage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  // const pageNumbers = Array.from({ length: totalpage }, (_, i) => i + 1);

  const pageNumbers = [];

  if (totalpage === 1) {
    pageNumbers[1];
  } else if (currentPage === 1) {
    pageNumbers.push(1, 2, 3);
    // Show pages 1, 2, 3 when at the start
  } else if (currentPage === totalpage) {
    pageNumbers.push(totalpage - 2, totalpage - 1, totalpage);
    // Show last 3 pages
  } else {
    pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    // Show current page and 1 before/after
  }
  return (
    <>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>User Management</h1>
        <button className='flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
          <UserPlus className='w-5 h-5' />
          Add New User
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
        {/* search section */}
        <div className='p-4 border-b'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2' />
              <input
                type='text'
                placeholder='Search users...'
                className='w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500'
                onChange={handlesearchinput}
                value={searchQuery}
              />
            </div>
            <select
              className='px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              name='username'
              value={selectedRole}
              onChange={searchandle}
            >
              <option value='All'>All Roles</option>
              {uniqueroles.length > 0 ? (
                uniqueroles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))
              ) : (
                <option disabled>no user available for the role</option>
              )}
            </select>
          </div>
        </div>

        {/* table details// users details */}
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='bg-gray-50'>
                <th className='px-4 py-3 text-left'>Username</th>
                <th className='px-4 py-3 text-left'>Email</th>
                <th className='px-4 py-3 text-left'>Phone</th>
                <th className='px-4 py-3 text-left'>Role</th>
                <th className='px-4 py-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                currentData.map((user, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-3'>{user.username}</td>
                    <td className='px-4 py-3'>{user.email}</td>
                    <td className='px-4 py-3'>{user.phone}</td>
                    <td className='px-4 py-3'>
                      {user.isAdmin ? 'Admin ' : 'User'}
                    </td>

                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-2'>
                        <button
                          className='p-1 hover:text-blue-600'
                          onClick={() => handleupdateClick(user)}
                        >
                          <Edit className='w-5 h-5' />
                        </button>
                        <button
                          className='p-1 hover:text-red-600'
                          onClick={() => handledeleteClick(user)}
                        >
                          <Trash2 className='w-5 h-5' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan='6'
                    className='p-4 font-bold text-center text-red-500 '
                  >
                    No User found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* panigation page numbers  */}
        {filteredUsers.length > 0 && pageNumbers.length > 0 && (
          <div className='p-4 border-t'>
            <div className='flex items-center justify-between'>
              <p className='text-gray-500'>
                Showing {(currentPage - 1) * usersperpage + 1} to{' '}
                {Math.min(currentPage * usersperpage, filteredUsers.length)} of{' '}
                {filteredUsers.length} entries
              </p>
              <div className='flex items-center gap-2'>
                <button
                  className='px-3 py-1 border rounded hover:bg-gray-50'
                  onClick={handlePrevious}
                  hidden={currentPage === 1} // Disable if on the first page
                >
                  Previous
                </button>
                {pageNumbers.map(pageNum => (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  className='px-3 py-1 border rounded hover:bg-gray-50'
                  onClick={handleNext}
                  hidden={currentPage === totalpage} // Disable if on the last page
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* update user Modal */}
      {updateusermodel && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-0 bg-white rounded-lg sm:p-6 '>
            <div className='max-h-[90vh] overflow-y-auto '>
              <h2 className='mb-4 text-xl font-semibold'>
                Update User Details
              </h2>
              <form className='space-y-4' onSubmit={updateduserdetails}>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    User Name
                  </label>
                  <input
                    type='text'
                    name='username'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='Enter UserName'
                    value={UC_userdetails.username}
                    onChange={handleupdateC}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='text'
                    name='subject'
                    className={`block w-full p-2 mt-1 text-gray-600 ${
                      isreadonly
                        ? 'bg-gray-100 border rounded-md shadow-sm cursor-not-allowed'
                        : 'bg-white text-black'
                    }`}
                    placeholder='Enter Email'
                    value={UC_userdetails.email}
                    onChange={handleupdateC}
                    readOnly={isreadonly}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm '
                    placeholder='Enter Phone Number'
                    value={UC_userdetails.phone}
                    onChange={handleupdateC}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    IsAdmin
                  </label>
                  <select
                    type='text'
                    name='isAdmin'
                    className='block w-full p-2 mt-1 border rounded-md shadow-sm'
                    placeholder='IsAdmin ?'
                    value={UC_userdetails.isAdmin ? 'true' : 'false'}
                    onChange={handleupdateC}
                  >
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                  </select>
                </div>

                <div className='flex justify-end gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={() => setupdateusermodel(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* delete confirmation model */}
      {deleteConfirmationModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-2xl p-6 bg-white rounded-lg'>
            {/* <h2 className='mb-4 text-xl font-semibold'>Delete Exam</h2> */}
            <h2 className='text-2xl font-bold text-center text-red-600'>
              Are you sure you want to delete the User?
            </h2>
            {usertodelete && (
              <div className='mt-4 text-center '>
                <p className=''>
                  <strong>User Name:</strong> {usertodelete.username}
                </p>
                <p>
                  <strong>Email:</strong> {usertodelete.email}
                </p>
              </div>
            )}
            <div className='flex justify-center mt-4'>
              <button
                className='px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-700 hover:font-bold'
                onClick={() => deleteUser(usertodelete._id)}
              >
                Yes, Delete
              </button>
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 hover:font-bold'
                onClick={() => setdeleteConfirmationModal(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// panigation,search,

// add new user
