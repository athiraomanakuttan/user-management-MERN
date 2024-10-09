import { createSlice} from '@reduxjs/toolkit'
import { currentUserType} from '../../type/type'

type initailStateType ={
    adminStatus : boolean,
    adminLoading: boolean, 
    error: boolean,
    userDetails: currentUserType[],
}
const initialState   = {
    adminStatus: false,
    adminLoading: false, 
    error: false,
    userDetails: [],
}

const adminSlice  = createSlice({
    name: 'admin',
    initialState,
    reducers:{
        adminLoginStart : (status)=>{
            status.adminLoading = true
        },
        adminLoginSuccess :(status,action)=>{
            status.adminLoading= false
            status.adminStatus= action.payload
            status.error= false
        },
        adminLoginFailed : (status,action)=>{
            status.adminLoading = false
            status.error= action.payload
        }
    }
})


export const { 
adminLoginStart,
adminLoginSuccess,
adminLoginFailed
} = adminSlice.actions


export default adminSlice.reducer;