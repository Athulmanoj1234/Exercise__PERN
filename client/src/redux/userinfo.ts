import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../constants";
import axios from "axios";

interface UserDetails {
    id: string;
    username: string;
}

export const userDetails = createAsyncThunk<UserDetails, void>("user/info", 
    async ()=> {
        const response = await axios.get<UserDetails>(`${url}/userprofile`, { withCredentials: true });
        return response.data;
    }
);

//initializing initial user state
const INITIAL_STATE = {
    userInfo: {}
} 

//creating slice for the user
const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(userDetails.pending, (state, action)=> {
        })
        .addCase(userDetails.fulfilled, (state, action)=> {
            state.userInfo = action.payload;
            console.log(state.userInfo);
        })
        .addCase(userDetails.rejected, (state, action)=> {

        });
    }
})

export default userSlice.reducer;
