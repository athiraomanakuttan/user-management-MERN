import { createSlice } from '@reduxjs/toolkit';
import { currentUserType } from '../../type/type';

type initialStateType = {
  adminStatus: boolean;
  adminLoading: boolean; 
  error: boolean;
  userDetails: currentUserType[];
};

const initialState: initialStateType = {
  adminStatus: false,
  adminLoading: false, 
  error: false,
  userDetails: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoginStart: (state) => {
      state.adminLoading = true;
    },
    adminLoginSuccess: (state, action) => {
      state.adminLoading = false;
      state.adminStatus = action.payload;
      state.error = false;
    },
    adminLoginFailed: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },
    
    accessUseListLoading: (state) => {
      state.adminLoading = true;
    },
    accessUseListSucess: (state, action) => {
      state.adminLoading = false;
      state.userDetails = action.payload;
      state.error = false;
    },
    accessUserListFailed: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },

    // Update user actions
    updateUserStart: (state) => {
      state.adminLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.adminLoading = false;
      state.userDetails = action.payload;
      state.error = false;
    },
    updateUserFailed: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },

    // Delete user actions
    deleteUserStart: (state) => {
      state.adminLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.adminLoading = false;
      state.error = false;
      state.userDetails = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },

    // Add user actions
    addUserStart: (state) => {
      state.adminLoading = true;
    },
    addUserSuccess: (state, action) => {
      state.adminLoading = false;
      state.userDetails = [...state.userDetails, action.payload]; // Add new user to list
      state.error = false;
    },
    addUserFailed: (state, action) => {
      state.adminLoading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  adminLoginStart,
  adminLoginSuccess,
  adminLoginFailed,
  accessUseListLoading,
  accessUseListSucess,
  accessUserListFailed,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailed,
} = adminSlice.actions;

export default adminSlice.reducer;
