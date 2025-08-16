import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: 0,
    name: '',
    token: '',
    role: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.firstName + ' ' + action.payload.lastName;
            state.token = action.payload.token;
            state.role = action.payload.role;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;