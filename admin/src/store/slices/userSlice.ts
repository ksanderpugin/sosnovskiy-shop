import { createSlice } from "@reduxjs/toolkit"
import { decodeString, encodeString } from "../../features/stringCoders";

const savedUserSateJSON = sessionStorage.getItem('ud');
const savedUserSate = savedUserSateJSON && JSON.parse(decodeString(savedUserSateJSON));

const initialState = savedUserSate || {
    id: '',
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

            const stateJSON = JSON.stringify(state);
            const code = encodeString(stateJSON);
            sessionStorage.setItem('ud', code);
        },
        logout: (state) => {
            console.log('LOGOUT');
            state.id = '';
            state.name = '';
            state.token = '';
            state.role = '';
            sessionStorage.removeItem('ud');
        }
    }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;