import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice.js";
import authSlice from "./Slice/authToken.js";
import storage from 'redux-persist/lib/storage'
import { persistStore,persistReducer } from "redux-persist";


const userPersist = {
    key:'user',
    storage
}

const authTokenPersist ={
   key:'auth',
   storage
}

const userPersistReducer = persistReducer(userPersist,userSlice)
const authPersistReducer = persistReducer(authTokenPersist,authSlice)

const store = configureStore({
    reducer:{
        user:userPersistReducer,
        auth:authPersistReducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false})
    
})
const persistor = persistStore(store)
export { store, persistor };
