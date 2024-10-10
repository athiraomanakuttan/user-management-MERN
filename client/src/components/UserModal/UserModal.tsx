import React, { useState } from 'react';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: { userName: string; userEmail: string; password: string }) => void;
}

const UserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Update the respective field in the formData
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Pass the entire formData object to onSave
    onClose(); // Close the modal after saving
    // Reset form data
    setFormData({ userName: '', userEmail: '', password: '' });
  };

  if (!isOpen) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">User Name</label>
            <input
              type="text"
              name="userName" // Add name attribute for identification
              value={formData.userName}
              onChange={handleChange} // Use the new handleChange function
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="userEmail" // Add name attribute for identification
              value={formData.userEmail}
              onChange={handleChange} // Use the new handleChange function
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password" // Add name attribute for identification
              value={formData.password}
              onChange={handleChange} // Use the new handleChange function
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
