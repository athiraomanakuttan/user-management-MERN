import React, { useEffect, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { accessUseListLoading, accessUseListSucess, accessUserListFailed, deleteUserFailed, deleteUserStart, deleteUserSuccess, updateUserFailed, updateUserStart } from '../../../../redux/admin/adminSlice';
import { RootState } from '../../../../app/user/store';
import { currentUserType } from '../../../../type/type';
import { updateUserSuccess } from '../../../../redux/user/userSlice';
import { toast } from 'react-toastify';
import Modalbox from '../../../components/Modalbox/Modalbox';

const Home = () => {
  const [editUserData, setEditUserData] = useState<currentUserType | null>(null);  // Initialize as null
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { userDetails } = useSelector((state: RootState) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    dispatch(accessUseListLoading());
    try {
      const res = await fetch('http://localhost:8000/api/admin/get-user-list', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) dispatch(accessUserListFailed(res.statusText));
      else {
        console.log(data.data);
        dispatch(accessUseListSucess(data.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(accessUserListFailed(err));
    }
  };

  const handleEditUser = (data: currentUserType) => {
    console.log('inside', data);
    setEditUserData(data);  // Set the edit user data here
    setIsModalOpen(true);   // Open the modal after setting the user data
  };

  const handleDelete = async (userId: string | undefined) => {
    if (!userId) {
      toast.error("Something went wrong");
      return;
    }
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      return; // Exit if the user clicks "Cancel"
    }
    else
  {  dispatch(deleteUserStart());
  
    try {
      const res = await fetch(`http://localhost:8000/api/admin/delete-user/${userId}`, {
        method: 'POST', // You may want to use 'DELETE' method if supported by your backend
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials if required
      });
  
      const data = await res.json(); // Await the JSON parsing
      if (!res.ok) {
        dispatch(deleteUserFailed(res.statusText));
        toast.error("Failed to delete the user");
      } else {
        // Ensure you're working with the correct type for userDetails (array of user objects)
        const updatedData = userDetails.filter((user:currentUserType) => user._id !== userId);
  
        dispatch(deleteUserSuccess(updatedData));
        toast.success("User deleted successfully");
      }
    } catch (err) {
      console.error("Error during deletion", err);
      toast.error("Something went wrong");
      dispatch(deleteUserFailed(err));
    }}
  };
  

  const handleUserUpdate = async () => {
    if (!editUserData) {
      console.error('No user data to update');
      return;
    }
  
    dispatch(updateUserStart());
  
    try {
      const res = await fetch(`http://localhost:8000/api/admin/update-user/${editUserData._id}`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editUserData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        dispatch(updateUserFailed(res.statusText));
      } else {
        // Create a new copy of the user details array without mutating state
        const updatedUserDetails = userDetails.map((user:currentUserType) =>
          user._id === data.data._id ? data.data : user
        );
  
        dispatch(updateUserSuccess(updatedUserDetails)); // Assuming updateUserSuccess is the correct action
      }
    } catch (err) {
      console.error('Update failed', err);
      dispatch(updateUserFailed(err));
    }
  };
  

  console.log(userDetails, 'userDetails');

  return (
    <div className="home-container h-[100vh]">
      <nav className="p-3 pr-12">
        <h1 className="text-end text-3xl font-bold">STD.</h1>
      </nav>
      <div className="userList w-[90%] mx-auto mt-5 p-8 bg-white rounded">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
              <button
                id="dropdownActionButton"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
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
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Action</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((data: currentUserType) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={data._id}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={data.profilePic} alt="User profile" />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{data.userName}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{data.userEmail}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditUser(data)}
                      >
                        Edit user
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>handleDelete(data._id)}>
                      <i className="fa-solid fa-trash text-red-700"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modalbox isOpen={isModalOpen}
        userData={editUserData}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUserUpdate}
        setEditUserData={setEditUserData}/>
      </div>
    </div>
  );
};

export default Home;
