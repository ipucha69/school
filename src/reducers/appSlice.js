import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    systemInfo: {},
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changeUser(state, action) { 
            state.user = action.payload;
        },
        addSystemInfo(state, action) { 
            state.systemInfo = action.payload;
        },
    },
});

export const { changeUser, addSystemInfo } = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectSystemInfo = (state) => state.app.systemInfo;

export default appSlice.reducer;