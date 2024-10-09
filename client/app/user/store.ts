import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from '../../redux/user/userSlice'
import adminReducer from '../../redux/admin/adminSlice'
import {persistReducer , persistStore} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    version:1,
    storage
}
const rootReducer = combineReducers({ user: userReducer, admin : adminReducer})
const persistedReducer = persistReducer(persistConfig,rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispach = typeof store.dispatch;

export default store;