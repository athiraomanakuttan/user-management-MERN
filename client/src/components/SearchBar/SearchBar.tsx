import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserFailed, addUserStart, addUserSuccess } from '../../../redux/admin/adminSlice';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  // State for form fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form submission
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newUser = {
      userName,
      userEmail,
      password,
    };
  
    console.log('New User:', newUser);
  
    // Dispatch the Redux action to start adding the user
    
    dispatch(addUserStart());
  
    try {
      // API call to add the user (replace with your API endpoint)
      const response = await fetch('http://localhost:8000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
  
      const data = await response.json();
  
      // Dispatch success action with the newly added user
      console.log(data)
      dispatch(addUserSuccess(data.user));
  
      // Reset form fields after submission
      setUserName('');
      setUserEmail('');
      setPassword('');
  
      // Close modal after submission
      setIsModalOpen(false);
    } catch (error:any) {
      // Dispatch failed action with the error message
      dispatch(addUserFailed(error.message));
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Search bar and button */}
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div>
          <button
            id="dropdownActionButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Add User
          </button>
        </div>
        <label className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Modal Box */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 space-y-4 text-black">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add User</h2>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
