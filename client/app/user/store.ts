import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../../redux/user/userSlice'

const store = configureStore({
    reducer:{
        user : userReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispach = typeof store.dispatch;

export default store;