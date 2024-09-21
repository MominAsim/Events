import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
}

export const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers:{
        setUser(state, action){
            state.user = action.payload;
        },
        setIsAuthenticated(state, action){
            state.isAuthenticated = action.payload = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated, setLoading } = userSlice.actions