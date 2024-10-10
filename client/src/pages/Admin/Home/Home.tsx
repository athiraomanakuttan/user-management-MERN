import React, { useEffect, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  accessUseListLoading,
  accessUseListSucess,
  accessUserListFailed,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailed,
  updateUserStart,
} from '../../../../redux/admin/adminSlice';
import { RootState } from '../../../../app/user/store';
import { currentUserType } from '../../../../type/type';
import { updateUserSuccess } from '../../../../redux/user/userSlice';
import { toast } from 'react-toastify';
import Modalbox from '../../../components/Modalbox/Modalbox';
import UserList from '../../../components/UserList/UserList'
import SearchBar from '../../../components/SearchBar/SearchBar';

const Home = () => {
  const [editUserData, setEditUserData] = useState<currentUserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Add search term state
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
        dispatch(accessUseListSucess(data.data));
      }
    } catch (err) {
      console.log(err);
      dispatch(accessUserListFailed(err));
    }
  };

  const filteredUsers = userDetails.filter((user: currentUserType) =>
    user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (data: currentUserType) => {
    setEditUserData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string | undefined) => {
    if (!userId) {
      toast.error('Something went wrong');
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (!isConfirmed) return;

    dispatch(deleteUserStart());
    try {
      const res = await fetch(`http://localhost:8000/api/admin/delete-user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailed(res.statusText));
        toast.error('Failed to delete the user');
      } else {
        const updatedData = userDetails.filter((user: currentUserType) => user._id !== userId);
        dispatch(deleteUserSuccess(updatedData));
        toast.success('User deleted successfully');
      }
    } catch (err) {
      console.error('Error during deletion', err);
      toast.error('Something went wrong');
      dispatch(deleteUserFailed(err));
    }
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
        const updatedUserDetails = userDetails.map((user: currentUserType) =>
          user._id === data.data._id ? data.data : user
        );
        dispatch(updateUserSuccess(updatedUserDetails));
      }
    } catch (err) {
      console.error('Update failed', err);
      dispatch(updateUserFailed(err));
    }
  };

  return (
    <div className="home-container h-[100vh]">
      <nav className="p-3 pr-12">
        <h1 className="text-end text-3xl font-bold">STD.</h1>
      </nav>
      <div className="userList w-[90%] mx-auto mt-5 p-8 bg-white rounded">
        {/* Pass searchTerm and setSearchTerm to SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <UserList
          userDetails={filteredUsers}  // Use filtered users here
          handleEditUser={handleEditUser}
          handleDelete={handleDelete}
        />
        <Modalbox
          isOpen={isModalOpen}
          userData={editUserData}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUserUpdate}
          setEditUserData={setEditUserData}
        />
      </div>
    </div>
  );
};

export default Home;
