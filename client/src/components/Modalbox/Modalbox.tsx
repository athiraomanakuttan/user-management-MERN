import React, { useState } from 'react';
import { currentUserType } from '../../../type/type';
interface EditUserModalProps {
    isOpen: boolean;
    userData: currentUserType | null ;
    onClose: () => void;
    onSave: () => void;
    setEditUserData: React.Dispatch<React.SetStateAction<currentUserType | null>>;
  }

const Modalbox = ({isOpen,
  userData,
  onClose,
  onSave,
  setEditUserData,
}: EditUserModalProps) => {
    if (!isOpen || !userData) return null; // Check if userData is null and return null if so

    return (
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="relative rounded-lg shadow dark:bg-gray-700 bg-slate-300 w-[30%]">
            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                Edit User
              </h3>
  
              {/* Edit User Form */}
              <form onSubmit={onSave}>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="block p-2 text-center text-black w-full mt-1 rounded-md border-gray-100 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={userData.userName || ''} // Safe to access userData.userName since null is checked above
                    onChange={(e) =>
                      setEditUserData((prevData) =>
                        prevData ? { ...prevData, userName: e.target.value } : null
                      )
                    }
                  />
                </div>
  
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modalbox
