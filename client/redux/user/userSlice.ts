import {createSlice } from '@reduxjs/toolkit'
import { currentUserType } from '../../type/type'

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
        }
    }

})

export const  {
    // user signup 
    signUpStart,
    signUpSuccess,
    signUpFailed
} = userSlice.actions

export default userSlice.reducer;