import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    status: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload,
                state.status = true
        },
        logout: (state) => {
            state.currentUser = null,
                state.status = false
        }
    }
})
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;