import {createSlice } from '@reduxjs/toolkit'
import { currentUserType } from '../../type/type'
import { act } from 'react'

type initialType ={
    currentUser : currentUserType | null ,
    loading: boolean,
    error: boolean | string
}

const initialState : initialType ={
    currentUser: null,
    loading:false,
    error:""
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signUpStart : (state)=>{
            state.loading = true;
            state.error=""
        },
        signUpSuccess : (state,action)=>
        {
            state.loading = false;
            state.error=""
            state.currentUser=action.payload
        },
        signUpFailed :(state,action)=>{
            state.loading = false
            state.error=action.payload
            state.currentUser = null
        },
        loginStart : (state)=>{
            state.loading = true;
        },
        loginSucess : (state,action)=>{
            state.loading= false
            state.currentUser=action.payload
            state.error=""
        },
        loginFailed : (state,action)=>{
            state.loading= false
            state.currentUser = null,
            state.error = action.payload
        },
        updateUserStart:(state)=>{
            state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.error="";
            state.loading=false
        },
        updateUserFailed:(state,action)=>{
            state.loading= false;
            state.error= action.payload
        }
        
    }

})

export const  {
    // user signup 
    signUpStart,
    signUpSuccess,
    signUpFailed,
    loginStart,
    loginFailed,
    loginSucess,
    updateUserFailed,
    updateUserStart,
    updateUserSuccess
} = userSlice.actions

export default userSlice.reducer;