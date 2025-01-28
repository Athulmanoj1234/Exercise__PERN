import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../constants";

interface adminDetails{
    username: string;
    id: number
}

export const adminDetails = createAsyncThunk<adminDetails, void>("admin/info", 
    async ()=> {
      const response = await axios.get<adminDetails>(`${url}/profile`, { withCredentials: true });
      console.log(response.data);
      return response.data;
    }
);

const INITIAL_STATE = {
    adminDetails: {}
}

const adminSlice = createSlice({
    name: "admin",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder)=> {
       builder
       //handling the pending state of async thunk
        .addCase(adminDetails.pending, (state, action)=> {
            console.log(action);
        })
        //handling fulfilled action type
        .addCase(adminDetails.fulfilled, (state, action)=> { //state and action are reducers that update the state
            console.log(action.payload);
            state.adminDetails = action.payload;
        })
        //handling rejected action type
        .addCase(adminDetails.rejected, (state, action)=> {
            console.log("error fetching admindetails");
        })
    }
});

export default adminSlice.reducer;

