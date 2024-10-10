import React from 'react';
import { currentUserType } from '../../../type/type';
import UserRow from '../../components/UserRow/UserRow';

interface UserListProps {
  userDetails: currentUserType[];
  handleEditUser: (data: currentUserType) => void;
  handleDelete: (userId: string | undefined) => void;
}

const UserList: React.FC<UserListProps> = ({ userDetails, handleEditUser, handleDelete }) => {
  return (
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
          <UserRow key={data._id} data={data} handleEditUser={handleEditUser} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
