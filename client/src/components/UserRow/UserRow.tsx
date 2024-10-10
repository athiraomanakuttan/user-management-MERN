import React from 'react';
import { currentUserType } from '../../../type/type';

function UserRow({ data, handleEditUser, handleDelete }: { data: currentUserType; handleEditUser: (data: currentUserType) => void; handleDelete: (userId: string | undefined) => void }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
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
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={() => handleEditUser(data)}
        >
          Edit user
        </button>
      </td>
      <td className="px-6 py-4">
        <button className="font-medium text-red-600 dark:text-blue-500 hover:underline" onClick={() => handleDelete(data._id)}>
          <i className="fa-solid fa-trash text-red-700"></i>
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
