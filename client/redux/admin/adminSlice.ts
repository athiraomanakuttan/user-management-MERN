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
        },
        accessUseListLoading:(status)=>{
            status.adminLoading= true
        },
        accessUseListSucess:(status,action)=>{
            status.adminLoading= false;
            status.userDetails= action.payload
            status.error= false
        },
        accessUserListFailed : (status,action)=>{
            status.adminLoading= false;
            status.error= action.payload
        }
    }
})


export const { 
adminLoginStart,
adminLoginSuccess,
adminLoginFailed,
accessUseListLoading,
accessUseListSucess,
accessUserListFailed
} = adminSlice.actions


export default adminSlice.reducer;