import { createSlice } from "@reduxjs/toolkit";

const initial = {token:''}

const authSlice = createSlice({
    name:'auth',
    initialState:initial,
    reducers:{
        addToken:(state,action)=>{
            state.token = action.payload.token
        },
        removeToken:(state)=>{
            state.token = ''
        }
    }
})

export const {addToken,removeToken} = authSlice.actions

export default authSlice.reducer